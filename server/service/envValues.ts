import dotenv from 'dotenv'

dotenv.config()

const API_SERVER_PORT = +(process.env.API_SERVER_PORT ?? '8080')
const API_BASE_PATH = process.env.API_BASE_PATH ?? ''
const API_ORIGIN = process.env.API_ORIGIN ?? ''

export { API_SERVER_PORT, API_BASE_PATH, API_ORIGIN }
