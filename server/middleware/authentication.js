import { UnauthorizedError } from '../errors/index.js'
import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('Authentication invalid')
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // Attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.username }
    console.log(req.user)
    next()
  } catch (error) {
    throw new UnauthorizedError('Authentication invalid')
  }
}

export default authMiddleware
