import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import auth from '../middleware/auth.js'
const router = express.Router();

router.use(auth)

router.get('/', async (req, res) => {
  try {
    const resumes = await prisma.resume.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(resumes);
  } catch (err) {
    console.error('Resume GET error:', err);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, filePath } = req.body;
    if (!title || !filePath) {
      return res.status(400).json({ error: 'Missing title or filePath' });
    }

    const resume = await prisma.resume.create({
      data: {
        title,
        filePath,
        userId: req.user.id,
      },
    });
    res.status(201).json(resume);
  } catch (err) {
    console.error('Resume POST error:', err);
    res.status(500).json({ error: 'Failed to save resume' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.resume.delete({ where: { id } });
    res.json({ message: 'Resume deleted successfully' });
  } catch (err) {
    console.error('Resume DELETE error:', err);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
});

export default router
