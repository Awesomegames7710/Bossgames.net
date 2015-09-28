let Instruction = require('instruction');

module.exports = class xCB extends Instruction {
  size()                    { return 2; }
  duration()                { return 8; }
  name()                    { return "CB"; }
  annotation_components()   { return ["*er*"]; }

  execute(cpu, memory) {
    let cb_code = memory.readIndexed(cpu.registerPC()+1);
    if(cb_code == 0x7C) {
      if((0b10000000 & cpu.registerH()) != 0b10000000) {
          // console.log("setting zero flag, pc:", cpu.registerPC(), "hl:", cpu.registerHL());
          cpu.setZeroFlag();
      } else {
        cpu.resetZeroFlag();
      }
      cpu.resetSubtractFlag();
      cpu.setHalfCarryFlag();
    } else if(cb_code == 0x11) {
      let oldC = cpu.carryFlag();
      let val = cpu.registerC();
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

      cpu.setRegisterC(res);

      // console.log("done 0xCB 0x11 : rl c")

    } else {
      throw "unimplemented bit (0xCB) instruction";
    }
  }
}
