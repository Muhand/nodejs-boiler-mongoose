"use strict"

const express = require('express')
const mainRoute = require('./main')

const router = express()

router.use('/main', mainRoute())

module.exports = router
