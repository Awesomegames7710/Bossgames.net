let GameboyComponent  = require('components/gameboy');
let Gameboy           = require('gameboy');

class GameboyEmulator {
  constructor(worker) {
    this.worker = worker;
    this.localGameboy = new Gameboy(true, this.worker);
    this.worker.onmessage = (m) => { this.localGameboy.messagedRecieved(m) };
  }

  start() {
    React.render(<GameboyComponent gameboy={this.localGameboy} />, document.querySelector("#container"));
    this.worker.postMessage("init");
  }
}

module.exports = GameboyEmulator;
