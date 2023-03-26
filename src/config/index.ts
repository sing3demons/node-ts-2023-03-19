import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 3000
export const NODE_ENV = process.env.NODE_ENV || 'development'

const MONGO_USER = process.env.MONGO_USER || 'root'
const MONGO_PASS = process.env.MONGO_PASS || 'p@ssw0rd2023'
const MONGO_DATABASE = process.env.MONGO_DATABASE || 'node-rest-api'
const MONGO_IP = process.env.MONGO_IP || '127.0.0.1'
const MONGO_PORT = process.env.MONGO_PORT || '27017'
const MONGO_AUTH = process.env.MONGO_AUTH || 'admin'
const MONGO_TIMEOUT = process.env.MONGO_TIMEOUT || 30000

export const MONGO = {
  URL: `mongodb://${MONGO_USER}:${encodeURIComponent(
    MONGO_PASS
  )}@${MONGO_IP}:${MONGO_PORT}/${MONGO_DATABASE}?connectTimeoutMS=${MONGO_TIMEOUT}&authSource=${MONGO_AUTH}`,
  TIMEOUT: MONGO_TIMEOUT,
}
