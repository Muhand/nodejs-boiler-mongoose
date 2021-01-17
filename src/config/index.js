"use strict"

require('dotenv').config()

// const env = process.env.NODE_ENV
const port = process.env.PORT

const config = {
  global: {
    showLogs: String(process.env.GLOBAL_SHOWLOGS).toUpperCase() === "YES" ? true : false,
    isProduction: process.env.production === 'true'
  },

  app: {
    bodyLimitInKB: `${parseInt(process.env.APP_BODY_LIMIT_IN_KB) || 100}kb`,
    apiVersion: process.env.APP_API_VERSION || 'v1'
  },

  server: {
    port: parseInt(port) || 3000
  },

  db: {
    provider: process.env.DB_PROVIDER || 'mongodb',
    host: process.env.DB_HOST || 'ds131697.mlab.com',
    port: parseInt(process.env.DB_PORT) || 31697,
    name: process.env.DB_NAME || 'crash-api_development',
    username: process.env.DB_USERNAME || 'test',
    password: process.env.DB_PASSWORD || 'test'
  }
}

module.exports = config
