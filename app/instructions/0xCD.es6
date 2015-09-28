let Instruction = require('instruction');
let Util        = require('util');

module.exports = class xCD extends Instruction {
  size()                    { return 3; }
  duration()                { return 12; }
  name()                    { return "CALL"; }
  annotation_components()   { return ["d16"]; }

  execute(cpu, memory) {
    let stackLocation = cpu.registerSP();
    cpu.setRegisterSP(stackLocation - 2);
    memory.writeDword(stackLocation - 2, cpu.registerPC() + 3);
    cpu.setRegisterPC(memory.readDword(cpu.registerPC()+1)-3);
  }
}
