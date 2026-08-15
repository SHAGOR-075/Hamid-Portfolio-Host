"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./config/db");
const sendEmail_1 = require("./utils/sendEmail");
const error_1 = require("./middleware/error");
const User_1 = require("./models/User");
const seeder_1 = require("./utils/seeder");
// Routes imports
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const homeRoutes_1 = __importDefault(require("./routes/homeRoutes"));
const aboutRoutes_1 = __importDefault(require("./routes/aboutRoutes"));
const skillRoutes_1 = __importDefault(require("./routes/skillRoutes"));
const educationRoutes_1 = __importDefault(require("./routes/educationRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const travelRoutes_1 = __importDefault(require("./routes/travelRoutes"));
const socialRoutes_1 = __importDefault(require("./routes/socialRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const settingsRoutes_1 = __importDefault(require("./routes/settingsRoutes"));
const activityRoutes_1 = __importDefault(require("./routes/activityRoutes"));
const seedRoutes_1 = __importDefault(require("./routes/seedRoutes"));
const backupRoutes_1 = __importDefault(require("./routes/backupRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = [
    process.env.CLIENT_ORIGIN,
    process.env.ADMIN_ORIGIN,
    'https://hamidkhokon.sites.bd',
    'https://hamid-portfolio-admin.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
].filter(Boolean);
// CORS first so failed DB/API responses still include ACAO headers
app.use((0, cors_1.default)({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(null, true);
    },
    credentials: true,
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use((0, helmet_1.default)({ crossOriginResourcePolicy: false }));
// Ensure MongoDB is connected before API handlers run (Vercel serverless)
app.use(async (req, res, next) => {
    if (req.path === '/api/health' || req.path === '/' || req.path === '/api') {
        next();
        return;
    }
    try {
        await (0, db_1.connectDB)();
        next();
    }
    catch (error) {
        next(error);
    }
});
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
// Root Route (Prevents "Not Found - /" error on Vercel deployment)
app.get('/', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Abdul Hamid Khokon Portfolio REST API Server',
        health: '/api/health',
        timestamp: new Date().toISOString(),
    });
});
app.get('/api', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Abdul Hamid Khokon Portfolio API Gateway',
        timestamp: new Date().toISOString(),
    });
});
// Health check route (does not require DB so deployment diagnostics stay available)
app.get('/api/health', async (req, res) => {
    let dbError;
    try {
        await (0, db_1.connectDB)();
    }
    catch (error) {
        dbError = error.message;
    }
    const database = (0, db_1.getDbStatus)();
    res.json({
        status: database.connected ? 'OK' : 'DEGRADED',
        message: 'Abdul Hamid Khokon Portfolio REST API Server Running',
        timestamp: new Date().toISOString(),
        database: dbError ? { ...database, error: dbError } : database,
        email: (0, sendEmail_1.getEmailConfigStatus)(),
        env: {
            hasMongoUri: Boolean(process.env.MONGODB_URI),
            nodeEnv: process.env.NODE_ENV || 'development',
            vercel: Boolean(process.env.VERCEL),
        },
    });
});
// API Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/home', homeRoutes_1.default);
app.use('/api/about', aboutRoutes_1.default);
app.use('/api/skills', skillRoutes_1.default);
app.use('/api/education', educationRoutes_1.default);
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/travel', travelRoutes_1.default);
app.use('/api/socials', socialRoutes_1.default);
app.use('/api/contact', contactRoutes_1.default);
app.use('/api/settings', settingsRoutes_1.default);
app.use('/api/activities', activityRoutes_1.default);
app.use('/api/seed', seedRoutes_1.default);
app.use('/api/backup', backupRoutes_1.default);
// Error Handling Middlewares
app.use(error_1.notFound);
app.use(error_1.errorHandler);
const PORT = process.env.PORT || 5000;
// Start Server locally if not running on Vercel
if (!process.env.VERCEL) {
    const startServer = async () => {
        try {
            await (0, db_1.connectDB)();
            // Check if database needs initial seeding
            const userCount = await User_1.User.countDocuments();
            if (userCount === 0) {
                console.log('[Auto-Seed]: Database empty, seeding default portfolio data & super admin...');
                await (0, seeder_1.seedDatabase)();
            }
            app.listen(PORT, () => {
                console.log(`[Express Server Running]: http://localhost:${PORT}`);
            });
        }
        catch (error) {
            console.error(`[Server Start Error]: ${error.message}`);
        }
    };
    startServer();
}
exports.default = app;
