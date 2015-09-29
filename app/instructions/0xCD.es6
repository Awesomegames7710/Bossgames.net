let Instruction = require('instruction');
let Util        = require('util');

module.exports = class xCD extends Instruction {
  size()                    { return 3; }
  duration()                { return 12; }
  name()                    { return "CALL"; }
  annotation_components()   { return ["d16"]; }

  execute(cpu, memory) {
    memory.stackPush(cpu.registerPC()+3);

    cpu.setRegisterPC(memory.readDword(cpu.registerPC()+1));
  }
}
