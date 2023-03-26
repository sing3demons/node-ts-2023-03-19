import { connect, ConnectOptions } from 'mongoose'
import logger from './logger'

import * as CONFIG from '../config'

const MONGO_OPTION: ConnectOptions = {
  keepAliveInitialDelay: Number(CONFIG.MONGO.TIMEOUT),
  connectTimeoutMS: Number(CONFIG.MONGO.TIMEOUT),
}

const Connect = async () => {
  try {
    await connect(CONFIG.MONGO.URL, MONGO_OPTION)
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

export default Connect
