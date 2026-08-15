import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB, getDbStatus } from './config/db';
import { getEmailConfigStatus } from './utils/sendEmail';
import { notFound, errorHandler } from './middleware/error';
import { User } from './models/User';
import { seedDatabase } from './utils/seeder';

// Routes imports
import authRoutes from './routes/authRoutes';
import homeRoutes from './routes/homeRoutes';
import aboutRoutes from './routes/aboutRoutes';
import skillRoutes from './routes/skillRoutes';
import educationRoutes from './routes/educationRoutes';
import projectRoutes from './routes/projectRoutes';
import travelRoutes from './routes/travelRoutes';
import socialRoutes from './routes/socialRoutes';
import contactRoutes from './routes/contactRoutes';
import settingsRoutes from './routes/settingsRoutes';
import activityRoutes from './routes/activityRoutes';
import seedRoutes from './routes/seedRoutes';
import backupRoutes from './routes/backupRoutes';

dotenv.config();

const app: Application = express();

const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  process.env.ADMIN_ORIGIN,
  'https://hamidkhokon.sites.bd',
  'https://hamid-portfolio-admin.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
].filter(Boolean) as string[];

// CORS first so failed DB/API responses still include ACAO headers
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(helmet({ crossOriginResourcePolicy: false }));

// Ensure MongoDB is connected before API handlers run (Vercel serverless)
app.use(async (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/api/health' || req.path === '/' || req.path === '/api') {
    next();
    return;
  }

  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Root Route (Prevents "Not Found - /" error on Vercel deployment)
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'Abdul Hamid Khokon Portfolio REST API Server',
    health: '/api/health',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'Abdul Hamid Khokon Portfolio API Gateway',
    timestamp: new Date().toISOString(),
  });
});

// Health check route (does not require DB so deployment diagnostics stay available)
app.get('/api/health', async (req: Request, res: Response) => {
  let dbError: string | undefined;

  try {
    await connectDB();
  } catch (error) {
    dbError = (error as Error).message;
  }

  const database = getDbStatus();

  res.json({
    status: database.connected ? 'OK' : 'DEGRADED',
    message: 'Abdul Hamid Khokon Portfolio REST API Server Running',
    timestamp: new Date().toISOString(),
    database: dbError ? { ...database, error: dbError } : database,
    email: getEmailConfigStatus(),
    env: {
      hasMongoUri: Boolean(process.env.MONGODB_URI),
      nodeEnv: process.env.NODE_ENV || 'development',
      vercel: Boolean(process.env.VERCEL),
    },
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/travel', travelRoutes);
app.use('/api/socials', socialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/backup', backupRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start Server locally if not running on Vercel
if (!process.env.VERCEL) {
  const startServer = async () => {
    try {
      await connectDB();

      // Check if database needs initial seeding
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        console.log('[Auto-Seed]: Database empty, seeding default portfolio data & super admin...');
        await seedDatabase();
      }

      app.listen(PORT, () => {
        console.log(`[Express Server Running]: http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error(`[Server Start Error]: ${(error as Error).message}`);
    }
  };

  startServer();
}

export default app;
