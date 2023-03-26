import { Request, Response } from 'express'
import logger from '../utils/logger'

export function createUserHandler(req: Request, res: Response) {
  try {
     const user = await createUser(req.body)
     return res.send(user)
  } catch (error: any) {
    logger.error(error)
    return res.status(409).send(error.message)
  }
}
