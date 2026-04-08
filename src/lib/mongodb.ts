import mongoose from "mongoose";

declare global {
  var mongooseConnection:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cached = globalThis.mongooseConnection ?? {
  conn: null,
  promise: null,
};

globalThis.mongooseConnection = cached;

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing from the environment.");
  }

  cached.promise ??= mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB ?? "sheen-mode",
  });

  cached.conn = await cached.promise;

  return cached.conn;
}