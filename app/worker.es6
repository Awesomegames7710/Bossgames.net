let Gameboy = require('gameboy');

class Worker {
  constructor() {
    this.gb = new Gameboy();
  }

  start() {
  }

  onMessage(m) {
    this.gb.messagedRecieved(m);
  }
}

module.exports = Worker;
