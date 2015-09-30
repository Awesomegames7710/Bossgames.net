let Instruction = require('instruction');
let Util        = require('util');

module.exports = class xCD extends Instruction {
  size()                    { return 3; }
  duration()                { return 12; }
  name()                    { return "CALL"; }
  annotation_components()   { return ["d16"]; }

  execute(cpu, memory) {
    let pc3 = cpu.registerPC() + 3;
    console.log(`PC3: ${pc3}`);
    memory.stackPush(pc3);

    memory.printStack();

    cpu.setRegisterPC(memory.readDword(cpu.registerPC()+1)-this.size());
  }
}
