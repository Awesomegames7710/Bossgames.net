let Instruction = require('instruction');

module.exports = class xE2 extends Instruction {
  size()                    { return 2; }
  duration()                { return 8; }
  name()                    { return "LD"; }
  annotation_components()   { return ["(C)", "A"]; }

  execute(cpu, memory) {
    let loc = 0xFF00 + cpu.registerC();
    memory.writeIndexed(loc, cpu.registerA());
  }
}
