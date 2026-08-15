import mongoose from 'mongoose';
import dns from 'dns';

// Force Node.js to use Google/Cloudflare public DNS to resolve MongoDB Atlas SRV records on Windows/ISPs
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch {
  // Ignore if custom DNS cannot be set
}

export const connectDB = async (): Promise<typeof mongoose> => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
    const conn = await mongoose.connect(connStr);
    console.log(`[MongoDB Connected]: ${conn.connection.host} / ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${(error as Error).message}`);
    console.error(
      `\n⚠️ MongoDB Atlas Connection Tips:\n` +
      ` 1. Network Access (IP Whitelist): Log in to MongoDB Atlas -> Network Access -> Add IP Address -> Allow Access From Anywhere (0.0.0.0/0).\n` +
      ` 2. Local MongoDB Alternative: If offline or testing locally, change MONGODB_URI in backend/.env to:\n` +
      `    MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_db\n`
    );
    process.exit(1);
  }
};
