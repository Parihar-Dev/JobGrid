import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns'

export const getStats = async (req, res) => {
    try {
        const userId = req.user.id
        const  [total, pending, saved, resume] = await Promise.all([
            prisma.job.count({where: {userId}}),
            prisma.job.count({where: {userId, status: "Pending"}}),
            prisma.job.count({where: {userId, status: "Saved"}}),
            prisma.job.count({where: {userId, status: "Resume Submitted"}})
        ])

        res.json({total, pending, saved, resume})
    } catch (err) {
        console.error(err)
        res.status(500).json({error: "Something went wrong"})
    }
}

export const getChartData = async (req, res) => {
    const userId = req.user.id
    
    try {
        const monthsToShow = 6
        const now = new Date()

        const result = []

        for (let i = monthsToShow - 1; i>=0; i--) {
            const monthStart = startOfMonth(subMonths(now,i))
            const monthEnd = endOfMonth(subMonths(now, i))
            const label = format(monthStart, 'MMM')

            const jobs = await prisma.job.findMany({
                where: {
                    userId,
                    date: {
                        gte: monthStart,
                        lte:monthEnd
                    }
                },
                select: {
                    status: true
                }
            })

            const statusCounts = {
                Applied: 0,
                Pending: 0,
                Interview: 0,
                Rejected: 0
            }

            jobs.forEach(job => {
                if (statusCounts[job.status] !== undefined) {
                    statusCounts[job.status] += 1
                }
            })

            result.push({
                month: label,
                ...statusCounts
            })
        }

        res.json(result)
    } catch (err) {
        console.error(err)
        res.status(500).json({error: "Failed to fetch chart data"})
    }
}