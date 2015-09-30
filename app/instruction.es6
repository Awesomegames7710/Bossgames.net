let Util = require('util');

class Instruction {
  constructor(op) { this.opcode = op;}

  size() { throw `no size for ${Util.hex(this.opcode)}`; }
  duration() { throw `no duration for ${Util.hex(this.opcode)}`; }
  execute(cpu, memory) { throw `no implementation for ${Util.hex(this.opcode)}`; }
  name() { throw `no name for ${Util.hex(this.opcode)}`; }
  annotation_components() { throw `no annotation config for ${Util.hex(this.opcode)}`}

  annotate(cpu, memory) {
    let annotation = `${this.name()} `;
    for(let item of this.annotation_components()) {
      if(item == "d16") {
        annotation += Util.dhex(memory.readDword(cpu.registerPC()+1));
      } else if(item == "r8") {
        annotation += Util.hex(memory.readIndexed(cpu.registerPC()+1));
      } else {
        annotation += item + " ";
      }
    }
    return annotation;
  }
}

module.exports = Instruction;
