"use strict"

const { createContainer, asClass, asValue, InjectionMode } = require('awilix')

// Config
const config = require('./config')

// Controllers
const mainController = require(`./interfaces/api/${config.app.apiVersion}/controllers/main`)

// Middlewares

const containerOptions = {
  injectionMode: InjectionMode.PROXY
}
let container = createContainer(containerOptions)

const init = async ({modules}) => {
  container.register({
    config: asValue(config),
    mainController: asClass(mainController),
    container: (c) => c
  })

  if (modules) {
    const dbConnection = modules.dbConnection
    const expressApp = modules.expressApp

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
  }

  return container
}


module.exports = {
  Container: container,
  init: init
}
