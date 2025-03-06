import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import router from './routes/projects.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())

app.use('/api/v1/projects', router)

async function start() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
  })
}

start()
