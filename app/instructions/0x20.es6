let Instruction = require('instruction');

module.exports = class x20 extends Instruction {
  size()                    { return 2; }
  duration()                { return 12; }
  name()                    { return "JR"; }
  annotation_components()   { return ["NZ", "r8"]; }

  execute(cpu, memory) {
    let jmpPoint = (memory.readIndexed(cpu.registerPC()+1));
    if(jmpPoint > 127) jmpPoint -= 256;

    if(!cpu.zeroFlag()) {
      cpu.setRegisterPC(cpu.registerPC() + jmpPoint);
    }
  }
}
