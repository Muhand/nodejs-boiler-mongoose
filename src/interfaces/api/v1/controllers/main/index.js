class MainController {
  // any dependencies that were injected can be called inside the brackets
  constructor({}) {
    // Bindings
    this.helloWorld = this.helloWorld.bind(this)
  }

  async helloWorld(req, res) {
    res.status(200).json({message:"OK"})
  }
}


module.exports = MainController
