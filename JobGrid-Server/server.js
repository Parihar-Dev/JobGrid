import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dashboardRoutes from './routes/dashboardRoute.js'
import jobRoutes from './routes/jobs.js'
import resumeRoutes from './routes/resume.js'
import { handler as uploadthingHandler } from './uploadthing.js'
import authRoutes from './routes/authRoutes.js'
import uploadRoutes from './routes/upload.js'

const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();
const allowedOrigins = [
  'https://astounding-palmier-0dbde4.netlify.app',
  'http://localhost:5173'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());


app.use('/upload', uploadRoutes)
app.use('/auth', authRoutes);
app.use('/api/uploadthing', uploadthingHandler)
app.use('/dashboard',dashboardRoutes)
app.use('/jobs',jobRoutes)
app.use('/resumes', resumeRoutes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
