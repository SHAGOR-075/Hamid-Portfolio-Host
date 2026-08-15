import mongoose from 'mongoose';
import dns from 'dns';

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

// Custom DNS helps Atlas SRV resolution on some local Windows/ISP networks only.
if (!process.env.VERCEL) {
  try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
  } catch {
    // Ignore if custom DNS cannot be set
  }
}

const getMongoUri = (): string => {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error(
      'MONGODB_URI is not configured. Add it to Vercel project Environment Variables.'
    );
  }
  return uri;
};

export const connectDB = async (): Promise<typeof mongoose> => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  const cached = global.mongooseCache ?? { conn: null, promise: null };
  global.mongooseCache = cached;

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const connStr = getMongoUri();

    cached.promise = mongoose
      .connect(connStr, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
      })
      .then((conn) => {
        console.log(
          `[MongoDB Connected]: ${conn.connection.host} / ${conn.connection.name}`
        );
        return conn;
      })
      .catch((error: Error) => {
        cached.promise = null;
        console.error(`[MongoDB Connection Error]: ${error.message}`);
        console.error(
          `\nMongoDB Atlas checklist:\n` +
            ` 1. Network Access: allow 0.0.0.0/0 (or Vercel IPs).\n` +
            ` 2. Vercel env: set MONGODB_URI with your Atlas connection string.\n` +
            ` 3. Include a database name, e.g. ...mongodb.net/portfolio_db?retryWrites=true\n`
        );
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export const getDbStatus = () => ({
  connected: mongoose.connection.readyState === 1,
  readyState: mongoose.connection.readyState,
  host: mongoose.connection.host || null,
  name: mongoose.connection.name || null,
});
