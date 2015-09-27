let Instruction = require('instruction');

module.exports = class x1A extends Instruction {
  size()                    { return 1; }
  duration()                { return 8; }
  name()                    { return "LD"; }
  annotation_components()   { return ["A", "(DE)"]; }

  execute(cpu, memory) {
    cpu.setRegisterA(memory.readIndexed(cpu.registerDE()));
  }
}
