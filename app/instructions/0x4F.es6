let Instruction = require('instruction');
let Util        = require('util');

module.exports = class xCD extends Instruction {
  size()                    { return 1; }
  duration()                { return 4; }
  name()                    { return "LD"; }
  annotation_components()   { return ["C", "A"]; }

  execute(cpu, memory) {
    cpu.setRegisterC(cpu.registerA());
  }
}
