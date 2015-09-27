class Util {
  hex(v) {
    if(v < 0x00) {
      return `dec(${v})`;
    } else if(v > 0xFF) {
      return this.dhex(v);
    } else {
      return `0x${("00" + v.toString(16).toUpperCase()).slice(-2)}`;
    }
  }

  dhex(v) {
    return `0x${("0000" + v.toString(16).toUpperCase()).slice(-4)}`;
  }

  dword(high, low) {
    let result = (high << 8) + low;
    return result;
  }

  highByte(dword) {
    return (dword & 0xFF00) >> 8;
  }

  lowByte(dword) {
    return (dword & 0x00FF);
  }
}

module.exports = new Util();
