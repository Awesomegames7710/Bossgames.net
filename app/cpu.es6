let Assertions        = require('assertions');
let Util              = require('util');
let InstructionTable  = require('instruction_table');

const CPU_FREQUENCY = 1.048576; // Mhz
const CPU_FREQUENCY_HZ = CPU_FREQUENCY * 1000 * 1000;
const MAX_STEP_TIME = 1 / CPU_FREQUENCY_HZ;

class Register {
  constructor(name, value, sixteenbit = false) {
    this._name = name;
    this.sixteen = sixteenbit;
    this.set(value);

    this.onChangedEvents = [];
    this.signalChangedTimeout = null;
    this.lastSignalChanged = new Date().getTime();
  }

  name() { return this._name; }

  get()  { return this._value; }
  set(v) {
    if(this.sixteen) { Assertions.expect(v >= 0x00 && v <= 0xFFFF); }
    else { Assertions.expect(v >= 0x00 && v <= 0xFF); }

    this._value = v;

    this.signalChanged(this.name());
  }

  signalChanged(register) {
    clearTimeout(this.signalChangedTimeout);
    let post = () => {
      this.lastSignalChanged = (new Date().getTime());
      postMessage({
        "cmd": "registerChanged",
        "register": register,
        "registerValue": this.get()
      }, [], "*");
    };

    if((new Date().getTime() - this.lastSignalChanged) > 500)
     post();
    else
      this.signalChangedTimeout = setTimeout(post, 100);
  }

  bit(n) {
    let mask = 0b00000001 << n;
    return ((this.get() & mask) == mask);
  }
}

class CPU {
  constructor(gameboy) {
    this.gameboy = gameboy;
    this.registers = {};

    this.steps = 0;
    this.lastReport = window.performance.now();

    this.instructionTable = new InstructionTable();

    this.initRegisters();

    this.registerUpdatedEvents = [];
  }

  initRegisters() {
    const registerNames = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'L'];
    const registerPairs = [['A', 'F'], ['B', 'C'], ['D', 'E'], ['H', 'L']];

    // this creates cpu.register/A|B|C|D|E|F|H|L/ and cpu.setRegister
    registerNames.forEach((name) => {
      this.registers[name] = new Register(name, 0x00);
      this[`register${name}`]     = (_) => { return this.registers[name].get(); };
      this[`setRegister${name}`]  = (v) => { this.registers[name].set(v); };
    });

    // this creates cpu.register/AF|BC|DE|HL/ and cpu.getRegister/AF|BC|DE|HL/
    registerPairs.forEach((name) => {
      this[`register${name.join('')}`]    = (_) => { return Util.dword(this.registers[name[0]].get(), this.registers[name[1]].get()); };
      this[`setRegister${name.join('')}`] = (v) => { this.registers[name[0]].set(Util.highByte(v)); this.registers[name[1]].set(Util.lowByte(v)); };
    });

    this.registers['PC'] = new Register('PC', 0x0000, true);
    this.registers['SP'] = new Register('SP', 0xFFFF, true);
  }

  registerPC() { return this.registers['PC'].get() }
  registerSP() { return this.registers['SP'].get() }

  setRegisterPC(v) { this.registers['PC'].set(v); }
  setRegisterSP(v) { this.registers['SP'].set(v); }

  updateRegister(name, val) {
    this.registers[name].set(val);
    this.fireRegisterUpdated(name);
  }

  attachRegisterUpdatedEvent(e) {
    this.registerUpdatedEvents.push(e);
  }

  fireRegisterUpdated(name) {
    this.registerUpdatedEvents.forEach((e) => { e(); });
  }

  zeroFlag() {
    return ((this.registerF() & 0b10000000) == 0b10000000);
  }

  setZeroFlag() {
    this.setRegisterF(0b10000000 | this.registerF());
  }

  resetZeroFlag() {
    this.setRegisterF(0b01111111 & this.registerF());
  }

  setSubtractFlag() {
    this.setRegisterF(0b01000000 | this.registerF());
  }

  resetSubtractFlag() {
    this.setRegisterF(0b10111111 & this.registerF());
  }

  setHalfCarryFlag() {
    this.setRegisterF(0b00100000 | this.registerF());
  }

  resetHalfCarryFlag() {
    this.setRegisterF(0b11011111 & this.registerF());
  }

  setCarryFlag() {
    this.setRegisterF(0b00010000 | this.registerF());
  }

  resetCarryFlag() {
    this.setRegisterF(0b11101111 & this.registerF());
  }

  run() {
    this.running = true;

    while(this.running)
      this.step();
  }

  step() {
    let opcode = this.gameboy.memory.readIndexed(this.registerPC());
    let currentInstruction = this.instructionTable.fetch(opcode)

    // console.log(currentInstruction.annotate(this, this.gameboy.memory));

    currentInstruction.execute(this, this.gameboy.memory);

    this.setRegisterPC(this.registerPC()+currentInstruction.size());
  }
}

module.exports = CPU;
