let Instruction = require('instruction');

module.exports = class xCB extends Instruction {
  size()                    { return 2; }
  duration()                { return 8; }
  name()                    { return "CB"; }
  annotation_components()   { return ["*er*"]; }

  execute(cpu, memory) {
    if(memory.readIndexed(cpu.registerPC()+1) == 0x7C) {
      if((0b10000000 & cpu.registerH()) != 0b10000000) {
          // console.log("setting zero flag, pc:", cpu.registerPC(), "hl:", cpu.registerHL());
          cpu.setZeroFlag();
      } else {
        cpu.resetZeroFlag();
      }
      cpu.resetSubtractFlag();
      cpu.setHalfCarryFlag();
    }
  }
}
