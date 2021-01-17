"use strict"

const morgan = require('morgan')('dev')

function init() {
  return morgan
}

module.exports = init
