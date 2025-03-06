import { CustomAPIError } from '../errors/index.js'

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }

  return res.status(500).json({ err })
  return res.status(500).json({ message: 'Something went wrong!' })
}

export default errorHandlerMiddleware
