import express from 'express'
import { routes } from './routes'
import { logger } from '../src/utils/logger'
import bodyParser from 'body-parser'
import cors from 'cors'

// check connection to database
import './utils/connectDB'

import deserializeToken from './middleware/deserializeToken'

const app = express()
const PORT = 5000

// parse body request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors access handler
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

app.use(deserializeToken)

routes(app)

app.listen(PORT, () => {
  logger.info(`Server running on port : ${PORT}`)
})
