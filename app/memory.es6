let Assertions  = require('assertions');
let Util        = require('util');

const MEMORY_SIZE = 0xFFFF;
const PAGE_SIZE   = 0x200;
const PAGE_COUNT  = MEMORY_SIZE / PAGE_SIZE;

class MemoryPage {
  constructor(gb, pageIndex) {
    this.memory           = new Uint8Array(PAGE_SIZE);
    this.parentPageIndex  = pageIndex;
    this.gameboy          = gb;
  }

  signalChanged() {
    if(!this.gameboy.slaveMode) {
      postMessage(
        {
          "cmd": "memoryPageUpdated",
          "pageIndex": this.parentPageIndex,
          "pageData": this.memory
        }, [], "*");
    }
  }

  setData(new_data) {
    Assertions.expect(new_data.length == PAGE_SIZE);
    this.memory = new_data;
  }

  write(index, data) {
    Assertions.expect(index >= 0 && index <= PAGE_SIZE);
    Assertions.expect(data >= 0x00 && data <= 0xFF);
    this.memory[index] = data;

    this.signalChanged();
  }

  read(index) {
    Assertions.expect(index >= 0 && index <= PAGE_SIZE);
    return this.memory[index];
  }
}

class Memory {
  constructor(gb) {
    this.gameboy = gb;
    this.memoryPages = [];
    this.onChangedListeners = [];

    for(let i = 0; i < PAGE_COUNT; i++) {
      this.memoryPages[i] = new MemoryPage(gb, i);
      this.memoryPages[i].signalChanged();
    }
  }

  loadFromUrl(url, offset, ignore_zero = true) {
    fetch(url).then((d) => {
      d.body.getReader().read().then((ll) => {
        for(let i = 0; i < ll.value.length; i++) {
          if(ll.value[i] == 0 && ignore_zero) { continue; }
          this.writeIndexed(i+offset, ll.value[i]);
        }
      })
    });
  }

  setPageData(index, data) {
    this.memoryPages[index].setData(data);
    this.fireOnChangedEvent(index);
  }

  fireOnChangedEvent(pageIndex) {
    this.onChangedListeners.forEach((l) => { l(); });
  }

  attachOnChangedListener(listener) {
    this.onChangedListeners.push(listener);
  }

  write(index, data) {
    this.writeIndex(index, data);
  }

  getPageIndex(index) {
    let page = Math.floor(index / PAGE_SIZE);
    return [page, index - (page * PAGE_SIZE)];
  }

  writeIndexed(index, data) {
    let [page, offset] = this.getPageIndex(index);
    this.memoryPages[page].write(offset, data);
  }

  readIndexed(index) {
    let [page, offset] = this.getPageIndex(index);
    return this.memoryPages[page].read(offset);
  }

  readDword(index) {
    let lo = this.readIndexed(index);
    let hi = this.readIndexed(index+1);

    return Util.dword(hi, lo);
  }

  writeDword(index, value) {
    let lo = Util.lowByte(value);
    let hi = Util.highByte(value);

    this.writeIndexed(index,  lo);
    this.writeIndexed(index+1, lo);
  }
}

module.exports = Memory;
