const { Router } = require('express')
const { Container } = require('../../../../../container')

const mainController = Container.resolve('mainController')


function main() {
  let api = Router()

  api.get('/', mainController.helloWorld)

  return api
}

module.exports = main
