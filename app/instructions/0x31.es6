let Instruction = require('instruction');

module.exports = class x31 extends Instruction {
  size()                    { return 3; }
  duration()                { return 12; }
  name()                    { return "LD"; }
  annotation_components()   { return ["SP", "d16"]; }

  execute(cpu, memory) {
    cpu.setRegisterSP(memory.readDword(cpu.registerPC()+1));
  }
}
