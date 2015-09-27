let CPU     = require('cpu');
let Util    = require('util');
let Memory  = require('memory');

class Gameboy {
  constructor(slave, worker) {
    this.memory     = new Memory(this);
    this.cpu        = new CPU(this);
    this.slaveMode  = slave;
    this.worker = worker;

    if(!this.slaveMode) {
      this.memory.loadFromUrl("http://localhost:3333/DMG_ROM.bin", 0);
    }
  }

  messagedRecieved(e) {
    if(e.data == "init") { return; } // ignore

    if(e.data.cmd == "memoryPageUpdated") {
      this.memory.setPageData(e.data.pageIndex, e.data.pageData);
    } else if(e.data.cmd == "step") {
      this.cpu.step();
    } else if(e.data.cmd == "play") {
      this.cpu.run();
    } else if(e.data.cmd == "registerChanged") {
      this.cpu.updateRegister(e.data.register, e.data.registerValue);
    } else {
      console.log("unrecognised message:", e);
    }
  }

  play() {
    if(!this.slaveMode) return;
    this.worker.postMessage({"cmd": "play"});
  }

  step() {
    if(!this.slaveMode) return;
    this.worker.postMessage({"cmd": "step"});
  }
}

module.exports = Gameboy;
