import dotenv from 'dotenv'
dotenv.config({path: './env/.env'})
import { createPool } from 'mysql2/promise'

export const pool = createPool({
    host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB,
     port: process.env.DB_PORT
})


