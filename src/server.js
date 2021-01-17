"use strict"

const express = require('express')
const http = require('http')
const loaders = require('./loaders')
const config = require('./config')

class Server {
  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.app.server = this.server
  }

  async startServer() {
    // Load dependencies
    await loaders.init({expressApp: this.app, config:config})

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
