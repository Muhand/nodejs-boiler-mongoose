"use strict"

const Server = require('./server')
const server = new Server()

server.startServer()

process.on('unhandledRejection', (err) => {
  // TODO: Manage unhandled errors. Maybe create some sort of logger?,
  // notify through channels such as slack? messages? emails? etc...
  console.log(`---------------------------------`);
  console.log(`| A new unhandled error caught. |`);
  console.log(`---------------------------------`);
  console.log(err);
})
