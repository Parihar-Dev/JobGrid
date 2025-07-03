import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dashboardRoutes from './routes/dashboardRoute.js'
import jobRoutes from './routes/jobs.js'
import resumeRoutes from './routes/resume.js'
import { handler as uploadthingHandler } from './uploadthing.js'
import authRoutes from './routes/authRoutes.js'
import uploadRoutes from './routes/upload.js'

dotenv.config();

const app = express();
app.use(cors({ origin: 'https://astounding-palmier-0dbde4.netlify.app/', credentials: true }));
app.use(express.json());


app.use('/upload', uploadRoutes)
app.use('/auth', authRoutes);
app.use('/api/uploadthing', uploadthingHandler)
app.use('/dashboard',dashboardRoutes)
app.use('/jobs',jobRoutes)
app.use('/resumes', resumeRoutes)

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
