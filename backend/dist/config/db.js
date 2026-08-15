"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbStatus = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dns_1 = __importDefault(require("dns"));
// Custom DNS helps Atlas SRV resolution on some local Windows/ISP networks only.
if (!process.env.VERCEL) {
    try {
        dns_1.default.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
    }
    catch {
        // Ignore if custom DNS cannot be set
    }
}
const getMongoUri = () => {
    const uri = process.env.MONGODB_URI?.trim();
    if (!uri) {
        throw new Error('MONGODB_URI is not configured. Add it to Vercel project Environment Variables.');
    }
    return uri;
};
const connectDB = async () => {
    if (mongoose_1.default.connection.readyState === 1) {
        return mongoose_1.default;
    }
    const cached = global.mongooseCache ?? { conn: null, promise: null };
    global.mongooseCache = cached;
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const connStr = getMongoUri();
        cached.promise = mongoose_1.default
            .connect(connStr, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
        })
            .then((conn) => {
            console.log(`[MongoDB Connected]: ${conn.connection.host} / ${conn.connection.name}`);
            return conn;
        })
            .catch((error) => {
            cached.promise = null;
            console.error(`[MongoDB Connection Error]: ${error.message}`);
            console.error(`\nMongoDB Atlas checklist:\n` +
                ` 1. Network Access: allow 0.0.0.0/0 (or Vercel IPs).\n` +
                ` 2. Vercel env: set MONGODB_URI with your Atlas connection string.\n` +
                ` 3. Include a database name, e.g. ...mongodb.net/portfolio_db?retryWrites=true\n`);
            throw error;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
};
exports.connectDB = connectDB;
const getDbStatus = () => ({
    connected: mongoose_1.default.connection.readyState === 1,
    readyState: mongoose_1.default.connection.readyState,
    host: mongoose_1.default.connection.host || null,
    name: mongoose_1.default.connection.name || null,
});
exports.getDbStatus = getDbStatus;
