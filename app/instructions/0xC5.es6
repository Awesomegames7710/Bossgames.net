let Instruction = require('instruction');

module.exports = class xC5 extends Instruction {
  size()                    { return 1; }
  duration()                { return 16; }
  name()                    { return "PUSH"; }
  annotation_components()   { return ["BC"]; }

  execute(cpu, memory) {
    let stackLocation = cpu.registerSP();
    cpu.setRegisterSP(stackLocation - 2);
    memory.writeDword(stackLocation - 2, cpu.registerBC());
  }
}
