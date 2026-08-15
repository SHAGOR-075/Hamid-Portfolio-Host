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
// Middlewares
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use((0, cors_1.default)({
    origin: true, // Dynamically reflect origin to allow requests from http://localhost:5173, 5174, etc.
    credentials: true,
}));
app.use((0, helmet_1.default)({ crossOriginResourcePolicy: false }));
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Abdul Hamid Khokon Portfolio REST API Server Running',
        timestamp: new Date().toISOString(),
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
// Start Server
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
        process.exit(1);
    }
};
startServer();
