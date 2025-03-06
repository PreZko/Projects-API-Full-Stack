import CustomAPIError from './custom-api.js'

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = 401
  }
}

export default UnauthorizedError
