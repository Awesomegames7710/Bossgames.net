let Instruction = require('instruction');

module.exports = class x3E extends Instruction {
  size()                    { return 2; }
  duration()                { return 8; }
  name()                    { return "LD"; }
  annotation_components()   { return ["A", "d8"]; }

  execute(cpu, memory) {
    cpu.setRegisterA(memory.readIndexed(cpu.registerPC()+1));
  }
}
