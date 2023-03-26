import { LoggerOptions, createLogger, format, transports } from 'winston'
import dayjs from 'dayjs'
import 'winston-daily-rotate-file'

const loggerOptions: LoggerOptions = {
  level: 'info',
  format: format.combine(
    format.label({ label: 'server' }),
    format.timestamp(),
    format.json(),
    format.printf(
      (info) => `${dayjs(info.timestamp).format('YYYY-MM-DD HH:mm:ss')} [${info.label}] ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new transports.Console({
      handleExceptions: true,
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) =>
            `${dayjs(info.timestamp).format('YYYY-MM-DD HH:mm:ss')} [${info.label}] ${info.level}: ${info.message}`
        )
      ),
    }),
    // new transports.DailyRotateFile({
    //   filename: 'logs/error.log',
    //   datePattern: 'yyyy-MM-ddTHH-mm',
    //   zippedArchive: true,
    //   handleExceptions: true,
    //   maxSize: '15m',
    //   frequency: '15m',
    //   maxFiles: 100000000,
    //   json: true,
    // }),
  ],
  defaultMeta: { service: 'user-service' },
}

const logger = createLogger(loggerOptions)
export default logger
