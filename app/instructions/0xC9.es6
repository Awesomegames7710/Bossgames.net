let Instruction = require('instruction');
let Util = require('util');

module.exports = class xC9 extends Instruction {
  size()                    { return 1; }
  duration()                { return 8; }
  name()                    { return "RET"; }
  annotation_components()   { return []; }

  execute(cpu, memory) {
    let stackLocation = cpu.registerSP();
    cpu.setRegisterSP(stackLocation + 2);
    cpu.setRegisterPC(memory.readDword(stackLocation));
  }
}
