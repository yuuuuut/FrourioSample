import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { API_SERVER_PORT, API_BASE_PATH } from '$/service/envValues'
import server from '$/$server'

const app = express()

app.use(helmet())
app.use(cors())

server(app, { basePath: API_BASE_PATH })

app.listen(API_SERVER_PORT)
