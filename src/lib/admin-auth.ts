import crypto from "node:crypto";

export const ADMIN_SESSION_COOKIE = "sheen-admin-session";
const sessionTtlSeconds = 60 * 60 * 12;

type SessionPayload = {
  username: string;
  exp: number;
};

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "sheen-mode-admin-session-fallback-secret";
}

function toBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a, "utf8");
  const bBuffer = Buffer.from(b, "utf8");

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

export function createAdminSessionToken(username: string) {
  const payload: SessionPayload = {
    username,
    exp: Math.floor(Date.now() / 1000) + sessionTtlSeconds,
  };
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined) {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);

  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const parsedPayload = JSON.parse(fromBase64Url(encodedPayload)) as SessionPayload;

    if (!parsedPayload.username || parsedPayload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return parsedPayload;
  } catch {
    return null;
  }
}

export function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD must be configured.");
  }

  return { username, password };
}

export function getAdminSessionMaxAge() {
  return sessionTtlSeconds;
}
