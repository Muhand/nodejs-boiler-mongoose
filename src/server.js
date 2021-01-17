"use strict"

const express = require('express')
const http = require('http')
const loaders = require('./loaders')
const container = require('./container')
const config = require('./config')
const expressInit = require('./express')

class Server {
  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.app.server = this.server

    this.startServer = this.startServer.bind(this)
    this.stop = this.stop.bind(this)
  }

  async startServer() {
    // Load dependencies
    let modules = await loaders.init({config:config})
    await container.init({modules})

    // Start interfaces
    // Web API interface
    console.log(`Initializing Express...`)
    await expressInit({app: this.app, appConfig: config.app}, modules.expressMiddlewares)
    console.log(`Express Initialized successfully`)

    // Start the server
    console.log(`\nStarting Server...`);
    this.app.server.listen(config.server.port, err => {
      if (err) {
        throw err
      }

      console.log(`Server started successfully.`)

      // Disable logs if its disabled in configs
      if (config.global.showLogs === false) {
        console.log = () => {
          return
        }
      }
    })
  }

  stop(done) {
    if(this.server) {
      this.server.close(done)
    } else {
      throw new Error(`Server is not running to be stopped`)
    }
  }
}

module.exports = Server
