// TODO: Finish express loader by compressing.
// by adding routes
// etc...
"use strict"

const bodyParser = require('body-parser')

async function init({app, appConfig}, middlewares = []) {
  const routes = require(`../interfaces/api/${appConfig.apiVersion}/routes`)

  if (!app || !appConfig) {
    throw new Error("Missing parameters while initialzing express.")
  }

  app.use(bodyParser.urlencoded({
    extended: false
  }))

  app.use(bodyParser.json({
    limit: appConfig.bodyLimitInKB
  }))

  if (middlewares && Array.isArray(middlewares) && middlewares.length > 0) {
    for (var i = 0; i < middlewares.length; i++) {
      app.use(middlewares[i])
    }
  }

  app.use(`/${appConfig.apiVersion}`, routes)
  app.use(notFoundError)
  app.use(unauthorizedError)
  app.use(expressErrorHandler)

  return app
}

function notFoundError(req, res, next) {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
}

function unauthorizedError(err, req, res, next) {
  // 401 thrown by express-jwt
  if (err.name == "UnauthorizedError") {
    return res
      .status(err.status)
      .send({message: err.message})
      .end()
  }

  return next(err)
}

function expressErrorHandler(error, req, res, _next) {
  res.status(error.status || 500)
  res.json({
    message: error.message,
    status: res.status
  })
}

module.exports = init
