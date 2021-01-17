"use strict"

const mongoose = require('mongoose')

async function init({dbConfig}) {
  mongoose.Promise = global.Promise

  const dbURL = `${dbConfig.provider}://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`

  const options = {
    //Refer to http://mongoosejs.com/docs/connections.html#use-mongo-client for more info on options
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }

  const connection = await mongoose.connect(dbURL, options)
  return connection.connection.db
}

module.exports = init
