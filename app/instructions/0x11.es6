let Instruction = require('instruction');

module.exports =  class x11 extends Instruction {
  size()                    { return 3; }
  duration()                { return 12; }
  name()                    { return "LD"; }
  annotation_components()   { return ["DE", "d16"]; }

  execute(cpu, memory) {
    cpu.setRegisterDE(memory.readDword(cpu.registerPC()+1));
  }
}
