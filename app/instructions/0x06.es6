let Instruction = require('instruction');
let Util        = require('util');

module.exports = class xCD extends Instruction {
  size()                    { return 2; }
  duration()                { return 8; }
  name()                    { return "LD"; }
  annotation_components()   { return ["B", "d8"]; }

  execute(cpu, memory) {
    cpu.setRegisterB(memory.readIndexed(cpu.registerPC()+1));
  }
}
