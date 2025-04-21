import express from 'express'
import { getRecords } from './db'
import { authMiddleware } from './auth.middleware'

export const recordRoute = express.Router()

recordRoute.post('/', authMiddleware, async (req, res) => {
  const { user_id, date } = req.body
  // date 格式 YYYY-MM-DD
  try {

    const records = await getRecords(user_id, date)

    res.status(200).json(records)

  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Internal Server Error'
    })
  }
  
  
})