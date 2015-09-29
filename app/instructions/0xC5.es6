let Instruction = require('instruction');
let Util        = require('util');

module.exports = class xC5 extends Instruction {
  size()                    { return 1; }
  duration()                { return 16; }
  name()                    { return "PUSH"; }
  annotation_components()   { return ["BC"]; }

  execute(cpu, memory) {
    memory.stackPush(cpu.registerBC());
  }
}
