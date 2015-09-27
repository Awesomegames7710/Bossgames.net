let Util = require('util');

class InstructionTable {
  constructor() {
    this.instructions = [];
    for(let i = 0x00; i < 0xFF; i++) {
      try {
        let i_class = require(`instructions/${Util.hex(i)}`);
        this.instructions[i] = new i_class(i);
      } catch(e) {
        if(e.message.slice(0, 18) != "Cannot find module") {
          throw e;
        }
        // Uncomment to be given a list of unimplemented
        // instructions at boot time. This kills startup
        // time somewhat wicked, because console.(log|warn)
        // are super slower.. like depressingly slow.
        // It's their dedup, but fuuuuuuuck...
        // else {
        //   console.warn(`Unimplemented instruction: ${Util.hex(i)}`);
        // }
      }

    }
  }

  fetch(index) {
    if(this.instructions[index] === undefined) throw `no class for: ${Util.hex(index)}`;

    return this.instructions[index];
  }
}

module.exports = InstructionTable;
