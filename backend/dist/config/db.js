"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dns_1 = __importDefault(require("dns"));
// Force Node.js to use Google/Cloudflare public DNS to resolve MongoDB Atlas SRV records on Windows/ISPs
try {
    dns_1.default.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
}
catch {
    // Ignore if custom DNS cannot be set
}
const connectDB = async () => {
    try {
        const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
        const conn = await mongoose_1.default.connect(connStr);
        console.log(`[MongoDB Connected]: ${conn.connection.host} / ${conn.connection.name}`);
        return conn;
    }
    catch (error) {
        console.error(`[MongoDB Connection Error]: ${error.message}`);
        console.error(`\n⚠️ MongoDB Atlas Connection Tips:\n` +
            ` 1. Network Access (IP Whitelist): Log in to MongoDB Atlas -> Network Access -> Add IP Address -> Allow Access From Anywhere (0.0.0.0/0).\n` +
            ` 2. Local MongoDB Alternative: If offline or testing locally, change MONGODB_URI in backend/.env to:\n` +
            `    MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_db\n`);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
