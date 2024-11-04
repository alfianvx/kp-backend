import { prisma } from '../services'
import { logger } from './logger'

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
async function main() {
  try {
    await prisma.$connect()
    logger.info('Database connected successfully ✅')
  } catch (error) {
    logger.error('Error connecting to database: ', error)
  }
}

main()
