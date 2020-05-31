class ErrorHandler extends Error {
  constructor(status = 500, message, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorHandler )
    }

    this.message = typeof message === 'string' ? [message] : message
    this.status = status
    this.date = new Date()
  }
}

const errorMiddleware = (err, req, res, next) => {
  console.log(err)
  return res.json(err).status(err.status || 500)
}

module.exports = { errorMiddleware, ErrorHandler }
