const { Router } = require('express')

// Import controller here

function main() {
  let api = Router()

  api.get('/', (req, res) => {
    res.status(200).json({message:"OK"})
  })

  return api
}

module.exports = main
