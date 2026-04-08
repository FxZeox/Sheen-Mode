import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import detect from "detect-port";

const preferredPort = Number(process.env.PORT || "3001");
const projectDir = path.resolve(process.cwd());
const nextLockFile = path.join(projectDir, ".next", "dev", "lock");

function readCommandLine(pid) {
  try {
    return fs.readFileSync(`/proc/${pid}/cmdline`, "utf8").replace(/\u0000/g, " ").trim();
  } catch {
    return "";
  }
}

function readCwd(pid) {
  try {
    return path.resolve(fs.readlinkSync(`/proc/${pid}/cwd`));
  } catch {
    return "";
  }
}

function findRunningNextDevPid() {
  const procEntries = fs.readdirSync("/proc", { withFileTypes: true });

  for (const entry of procEntries) {
    if (!entry.isDirectory() || !/^\d+$/.test(entry.name)) {
      continue;
    }

    const pid = Number(entry.name);

    if (!Number.isFinite(pid) || pid === process.pid) {
      continue;
    }

    const cmdline = readCommandLine(pid);

    if (!cmdline.includes("next") || !cmdline.includes("dev")) {
      continue;
    }

    const cwd = readCwd(pid);

    if (cwd === projectDir) {
      return pid;
    }
  }

  return null;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getLockedNextPid() {
  try {
    if (!fs.existsSync(nextLockFile)) {
      return null;
    }

    const parsed = JSON.parse(fs.readFileSync(nextLockFile, "utf8"));

    if (!parsed.pid || !Number.isFinite(parsed.pid)) {
      return null;
    }

    return parsed.pid;
  } catch {
    return null;
  }
}

async function terminatePid(pid) {
  try {
    process.kill(pid, "SIGTERM");
  } catch {
    return;
  }

  for (let i = 0; i < 10; i += 1) {
    try {
      process.kill(pid, 0);
      // eslint-disable-next-line no-await-in-loop
      await sleep(200);
    } catch {
      return;
    }
  }

  try {
    process.kill(pid, "SIGKILL");
  } catch {
    // Process already exited.
  }
}

async function stopExistingDevServer() {
  const pids = new Set();
  const lockedPid = getLockedNextPid();
  const scannedPid = findRunningNextDevPid();

  if (lockedPid) {
    pids.add(lockedPid);
  }

  if (scannedPid) {
    pids.add(scannedPid);
  }

  for (const pid of pids) {
    console.log(`[dev-server] Stopping existing Next.js dev server (PID ${pid})`);
    // eslint-disable-next-line no-await-in-loop
    await terminatePid(pid);
  }
}

async function start() {
  await stopExistingDevServer();
  const port = await detect(preferredPort);
  const args = ["next", "dev", "--turbopack", "-p", String(port)];

  console.log(`[dev-server] Starting Next.js on port ${port}`);

  const child = spawn("npx", args, {
    stdio: "inherit",
    env: process.env,
    shell: false,
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 0);
  });

  process.on("SIGINT", () => child.kill("SIGINT"));
  process.on("SIGTERM", () => child.kill("SIGTERM"));
}

start().catch((error) => {
  console.error("[dev-server] Failed to start:", error.message);
  process.exit(1);
});
