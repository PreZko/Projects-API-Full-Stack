import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import 'express-async-errors'

import projectsRouter from './routes/projects.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'

import connectDB from './db/connect.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())

app.use('/api/v1/projects', projectsRouter)
app.use(notFoundMiddleware)

app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
