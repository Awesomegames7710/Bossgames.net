let Instruction = require('instruction');
let Util = require('util');

module.exports = class xC9 extends Instruction {
  size()                    { return 1; }
  duration()                { return 8; }
  name()                    { return "RET"; }
  annotation_components()   { return []; }

  execute(cpu, memory) {
    cpu.setRegisterPC(memory.stackPop());
  }
}
