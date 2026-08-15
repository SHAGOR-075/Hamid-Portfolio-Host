import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './config/db';
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

// Middleware to ensure DB connection on serverless environments (Vercel)
app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(
  cors({
    origin: true, // Allow dynamic origins (http://localhost:5173, Vercel deployments, etc.)
    credentials: true,
  })
);
app.use(helmet({ crossOriginResourcePolicy: false }));

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

// Health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'Abdul Hamid Khokon Portfolio REST API Server Running',
    timestamp: new Date().toISOString(),
    email: getEmailConfigStatus(),
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
