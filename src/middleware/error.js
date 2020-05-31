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
  const errData = err instanceof ErrorHandler
    ? err
    : new ErrorHandler(500, 'Ocorreu um erro inesperado, tente novamente mais tarde')

  console.log(err)
  res.json(errData).status(errData.status || 500)
}

module.exports = { errorMiddleware, ErrorHandler }
