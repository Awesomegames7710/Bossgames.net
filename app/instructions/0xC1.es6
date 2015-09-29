let Instruction = require('instruction');
let Util        = require('util');

module.exports = class xCD extends Instruction {
  size()                    { return 1; }
  duration()                { return 12; }
  name()                    { return "POP"; }
  annotation_components()   { return ["BC"]; }

  execute(cpu, memory) {
    cpu.setRegisterBC(memory.stackPop());
  }
}
