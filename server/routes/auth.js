import express from 'express'
import authMiddleware from '../middleware/authentication.js'

const router = express.Router()

import { login, register, logout } from '../controllers/auth.js'

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/verify-token', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'User is authenticated', user: req.user })
})

export default router
