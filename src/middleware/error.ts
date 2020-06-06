import { Request, Response, NextFunction } from 'express'

export class ErrorHandler extends Error {
  public description: string | string[]
  public status: number
  public date: Date

  constructor(status = 500, description: string | string[], ...params: any[]) {
    super(...params)
    if (Error.captureStackTrace) Error.captureStackTrace(this, ErrorHandler)

    this.description = typeof description === 'string' ? [description] : description
    this.status = status
    this.date = new Date()
  }
}

export const errorMiddleware = (err: Error | ErrorHandler, _: Request, res: Response, _2: NextFunction) => {
  const errData = err instanceof ErrorHandler
    ? err
    : new ErrorHandler(500, 'Ocorreu um erro inesperado, tente novamente mais tarde')

  console.log(err)
  res.json(errData).status(errData.status || 500)
}
