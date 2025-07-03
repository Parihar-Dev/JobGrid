import express from 'express'
const router = express.Router()
import { getStats, getChartData } from '../controller/dashboardController.js'
import verifyToken from '../middleware/auth.js'

router.get('/stats', verifyToken, getStats)
router.get('/chart', verifyToken, getChartData)

export default router