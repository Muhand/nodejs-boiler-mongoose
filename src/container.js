"use strict"

const { createContainer, asClass, asValue, InjectionMode } = require('awilix')

// Config
const config = require('../config')

// Controllers
const mainController = require(`../interfaces/api/${config.app.apiVersion}/controllers/main`)

// Middlewares

const containerOptions = {
  injectionMode: InjectionMode.PROXY
}

const loadAppContainer = async ({dbConnection, expressApp}) => {
  const container = createContainer(containerOptions)

  container.register({
    container: (c) => c,
    config: asValue(config),
    mainController: asClass(mainController),
  })

  // Inject db connection
  if (dbConnection && dbConnection != undefined) {
    container.register({
      dbConnection: asValue(dbConnection),
    })
  }

  // Inject the actual express app
  if (expressApp && expressApp != undefined) {
    container.register({
      app: asValue(expressApp),
    })
  }

  return container
}

module.exports = loadAppContainer()
