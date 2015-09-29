let Util = require('util');

const regs = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'L',
              'AF', 'BC', 'DE', 'HL', 'PC', 'SP'];

let Registers = React.createClass({
  getInitialState: function() {
    for(let r of regs) {
      // console.log("register:", this.props.cpu.registers[r]);
      this.props.cpu.attachRegisterUpdatedEvent(this.registerChanged);
    }

    return {};
  },
  registerChanged() {
    this.forceUpdate();
  },
  render: function() {
    let rows = [];

    for(let r of regs) {
      rows.push(<li key={r}><b>{r}</b>&nbsp;{Util.hex(this.props.cpu[`register${r}`]())}</li>);
    }

    return (
      <div id="registers">
        Registers
        <ul>
          {rows}
        </ul>
      </div>
    );
  }
});

module.exports = Registers;
