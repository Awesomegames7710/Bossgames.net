let Instruction = require('instruction');

module.exports = class x32 extends Instruction {
  size()                    { return 1; }
  duration()                { return 8; }
  name()                    { return "LD"; }
  annotation_components()   { return ["(HL-)", "A"]; }

  execute(cpu, memory) {
    memory.writeDword(cpu.registerHL(), cpu.registerA());
    cpu.setRegisterHL(cpu.registerHL() - 1);
  }
}
