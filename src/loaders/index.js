"use strict"

const mongooseLoader = require('./mongooseLoader')
const morganLoader = require('./morganLoader')
const helmetLoader = require('./helmetLoader')

async function init({config}) {
  try {
    // MARK:- Initialize database
    console.log(`Initializing Mongodb...`)
    const dbConnection = await mongooseLoader({dbConfig: config.db})
    console.log(`MongoDB initialized successfully`)

    // TODO: Add Redis initializer here

    // MARK:- Initialized morgan
    console.log(`Initializing Morgan...`)
    const morgan = morganLoader()
    console.log(`Morgan initialized successfully`)

    //MARK:- Initializing helmet
    console.log(`Initializing Helmet...`)
    const helmet = helmetLoader()
    console.log(`Helmet initialized successfully`)

    // MARK:- Initialize Express
    const expressMiddlewares = [
      // Logger
      morgan,

      // HTTP Security
      helmet
    ]

    // console.log(`Injecting dependencies...`)
    // const _container = await dependencyInjector({dbConnection: dbConnection, expressApp: app})
    // console.log(`Dependencies injected successfully`)


    const modules = {
      dbConnection: dbConnection,
      // expressApp: app,
      expressMiddlewares: expressMiddlewares
    }

    return Promise.resolve(modules)
  } catch(e) {
    // Handle error here, maybe log it?
    console.log(e);
    console.log(`\nInitialization phase failed, terminating.`);
    process.exit(1)
  }
}

module.exports.init = init;
