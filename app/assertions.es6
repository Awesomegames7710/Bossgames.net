class ConditionError extends Error {
  constructor(message) { super(); this.message = message; }
}
module.exports = {
  assert_location() {
    var e = new Error();
    if (!e.stack) try {
      // IE requires the Error to actually be throw or else the Error's 'stack'
      // property is undefined.
      throw e;
    } catch (exception) {
      if (!exception.stack) {
        return 0; // IE < 10, likely
      }
    }
    var stack = e.stack.toString().split(/\r\n|\n/);
    // We want our caller's frame. It's index into |stack| depends on the
    // browser and browser version, so we need to search for the second frame:
    var frameRE = /(\d+):(?:\d+)[^\d]*$/;
    let frame;
    do {
      frame = stack.shift();
    } while (!frameRE.exec(frame) && stack.length);
    return frameRE.exec(stack.shift())[1];
  },
  expect(condition, v) {
    let vv = (v === undefined) ? "?" : v;
    if(!condition) {
      throw new ConditionError(`Unmet condition, line ${this.assert_location()} of app.js, value was: ${vv}`);
    }
  }
};
