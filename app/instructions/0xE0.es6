let Instruction = require('instruction');

module.exports = class xE2 extends Instruction {
  size()                    { return 2; }
  duration()                { return 8; }
  name()                    { return "LDH"; }
  annotation_components()   { return ["(d8)", "A"]; }

  execute(cpu, memory) {
    let loc = 0xFF00 + memory.readIndexed(cpu.registerPC()+1);
    memory.writeIndexed(loc, cpu.registerA());
  }
}
