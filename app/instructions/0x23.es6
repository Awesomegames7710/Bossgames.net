let Instruction = require('instruction');

module.exports = class x23 extends Instruction {
  size()                    { return 1; }
  duration()                { return 8; }
  name()                    { return "INC"; }
  annotation_components()   { return ["HL"]; }

  execute(cpu, memory) {
    cpu.registerHL(cpu.registerHL());
  }
}
