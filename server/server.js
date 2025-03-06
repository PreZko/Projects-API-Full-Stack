import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'

import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss'
import rateLimit from 'express-rate-limit'

import projectsRouter from './routes/projects.js'
import authRouter from './routes/auth.js'

import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'

import authMiddleware from './middleware/authentication.js'

import connectDB from './db/connect.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())

// Extra security
app.use(helmet())
app.use(cors())
app.use((req, res, next) => {
  if (req.body) req.body = JSON.parse(xss(JSON.stringify(req.body)))
  next()
})
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/projects', authMiddleware, projectsRouter)

// Error handling
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log('Database connected successfully')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`)
    })
  } catch (error) {
    console.log('Failed to start server', error)
  }
}

start()
