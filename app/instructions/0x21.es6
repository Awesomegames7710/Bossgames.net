let Instruction = require('instruction');

module.exports =  class x21 extends Instruction {
  size()                    { return 3; }
  duration()                { return 12; }
  name()                    { return "LD"; }
  annotation_components()   { return ["HL", "d16"]; }

  execute(cpu, memory) {
    cpu.setRegisterHL(memory.readDword(cpu.registerPC()+1));
  }
}
