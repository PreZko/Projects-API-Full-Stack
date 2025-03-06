import { BadRequestError, UnauthorizedError } from '../errors/index.js'
import User from '../models/User.js'

export const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    throw new BadRequestError('Please provide email and password')

  const user = await User.findOne({ email })
  if (!user) throw new UnauthorizedError('Invalid Credentials')

  const isPasswordCorrect = await user.comparePasswords(password)
  if (!isPasswordCorrect) throw new UnauthorizedError('Invalid Credentials')

  const token = user.createJWT()
  res.status(201).json({ user: { name: user.username }, token })
}

export const register = async (req, res) => {
  const user = await User.create(req.body)
  const token = user.createJWT()
  res.status(201).json({ user: { name: user.username }, token })
}
