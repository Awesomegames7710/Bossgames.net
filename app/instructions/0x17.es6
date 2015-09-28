let Instruction = require('instruction');

module.exports =  class x17 extends Instruction {
  size()                    { return 1; }
  duration()                { return 4; }
  name()                    { return "RLA"; }
  annotation_components()   { return []; }

  execute(cpu, memory) {
    let oldC = cpu.carryFlag();
    let val = cpu.registerA();
    let newC = val >> 7;
    let res = 0b01111111 & (val << 1) & oldC;
    if (newC) {
      cpu.setCarryFlag();
    } else {
      cpu.resetCarryFlag();
    }
    if (res) {
      cpu.resetZeroFlag();
    } else {
      cpu.setZeroFlag();
    }

    cpu.setRegisterA(res);
  }
}
