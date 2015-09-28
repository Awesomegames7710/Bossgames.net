let Instruction = require('instruction');

module.exports = class xCD extends Instruction {
  size()                    { return 1; }
  duration()                { return 12; }
  name()                    { return "POP"; }
  annotation_components()   { return ["BC"]; }

  execute(cpu, memory) {
    let stackLocation = cpu.registerSP();
    cpu.setRegisterSP(stackLocation + 2);
    cpu.setRegisterBC(memory.readDword(stackLocation));
  }
}
