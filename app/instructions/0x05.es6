let Instruction = require('instruction');

module.exports = class x05 extends Instruction {
  size()                    { return 1; }
  duration()                { return 4; }
  name()                    { return "DEC"; }
  annotation_components()   { return ["B"]; }

  execute(cpu, memory) {
    let val = cpu.registerB();
    if (cpu.registerB() == 0) {
      cpu.setZeroFlag();
    } else {
      cpu.resetZeroFlag();
    }

    cpu.setRegisterB(val-1);

    cpu.setSubtractFlag();
  }
}
