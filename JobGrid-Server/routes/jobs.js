import express from 'express'
import { PrismaClient } from '@prisma/client'
import auth from '../middleware/auth.js'

const router = express.Router()
const prisma = new PrismaClient()

router.use(auth)

router.get('/', async (req, res) => {
  const jobs = await prisma.job.findMany({ where: { userId: req.user.id } })
  res.json(jobs)
})

router.post('/', async (req, res) => {
  const job = await prisma.job.create({
    data: {
      ...req.body,
      date: new Date(req.body.date),
      userId: req.user.id
    }
  })
  res.json(job)
})

router.put('/:id', async (req, res) => {
  const job = await prisma.job.findFirst({
    where: { id: req.params.id, userId: req.user.id },
  });

  if (!job) {
    return res.status(403).json({ error: 'Unauthorized to edit this job' });
  }

  const updated = await prisma.job.update({
    where: { id: job.id },
    data: req.body
  });

  res.json(updated);

})

router.delete('/:id', async (req, res) => {
  const job = await prisma.job.findFirst({
    where: { id: Number(req.params.id), userId: req.user.id },
  });

  if (!job) {
    return res.status(403).json({ error: 'Unauthorized to delete this job' });
  }

  await prisma.job.delete({ where: { id: job.id } });
  res.sendStatus(204);
})

export default router
