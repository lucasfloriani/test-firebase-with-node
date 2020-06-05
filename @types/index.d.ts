import { Request } from 'express'
import ExpressCore from 'express-serve-static-core'

declare module "express-serve-static-core" {
  type GroupCallback = (router: Router) => void

  export interface Router {
    group(arg1: string, arg2: GroupCallback): void
    group(arg1: GroupCallback, arg2: undefined): void
  }

  export interface Application {
    group(arg1: string, arg2: GroupCallback): void
    group(arg1: GroupCallback, arg2: undefined): void
  }
}

declare module 'express' {
  export interface Request<P extends ExpressCore.Params = ExpressCore.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = ExpressCore.Query, Payload extends object = {}> {
    payload?: Payload
  }

  export interface RequestExtended<Payload> extends Request {
    payload?: Payload
  }
}
