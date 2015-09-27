let Controls            = require('components/controls');
let GameboyPlayer       = require('components/player');
let MemoryDebugger      = require('components/memory_debugger');
let RegistersDebugger   = require('components/registers');
let Tabbed              = require('components/tabbed');

let Gameboy = React.createClass({
  render: function() {
    return (
      <div id="gameboy">
        <Controls gameboy={this.props.gameboy} />


        <RegistersDebugger cpu={this.props.gameboy.cpu} />
        <GameboyPlayer />
        <MemoryDebugger memory={this.props.gameboy.memory} />

        <Tabbed />
      </div>
    );
  }
});

module.exports = Gameboy;
