import express from 'express'
import { PORT } from './config'
import ConnectDB from './utils/connect'
import logger from './utils/logger'
import router from './routes'

const app = express()
ConnectDB()
app.use(express.json())
app.use(router)

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`))
