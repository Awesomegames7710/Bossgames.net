let Instruction = require('instruction');

module.exports = class xAF extends Instruction {
  size()                    { return 1; }
  duration()                { return 4; }
  name()                    { return "XOR"; }
  annotation_components()   { return ["A"]; }

  execute(cpu, memory) {
    // cpu.setRegisterA(cpu.registerA() ^ cpu.registerA());
    cpu.setRegisterA(0x00);
    cpu.setZeroFlag();
  }
}
