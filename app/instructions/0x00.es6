let Instruction = require('instruction');

module.exports = class x00 extends Instruction {
  size()                { return 1; }
  duration()            { return 4; }
  execute(cpu, memory)  { }
  name()                { "NOP"}
  annotation_components()            { return []; }
}
