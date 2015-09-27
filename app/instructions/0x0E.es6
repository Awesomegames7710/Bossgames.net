let Instruction = require('instruction');

module.exports = class x0E extends Instruction {
  size()                    { return 2; }
  duration()                { return 8; }
  name()                    { return "LD"; }
  annotation_components()   { return ["C", "d8"]; }

  execute(cpu, memory) {
    cpu.setRegisterC(memory.readIndexed(cpu.registerPC()+1));
  }
}
