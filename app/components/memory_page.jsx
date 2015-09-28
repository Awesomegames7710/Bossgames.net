let Util = require('util');

let MemoryPage = React.createClass({
  render: function() {
    let rows = [];

    let pc = this.props.page.gameboy.cpu.registerPC();

    for(let i = 0; i < 512; i += 8) {
      let row = [];

      for(let j = 0; j < 8; j++) {
        let isActive = "";
        let s = ((this.props.page.parentPageIndex * 512) + i + j);

        if(pc === s) {
          isActive = "active";
        }

        row.push(
          <span className={isActive}>
            {Util.hex(this.props.page.memory[i+j]) + " "}
          </span>
        );
      }

      let index = (this.props.page.parentPageIndex*512) + i;

      rows.push(<div key={i}>{Util.dhex(index) + " | "}{row}</div>);
    }

    return (
      <div>
        {rows}
      </div>
    );
  }
});

module.exports = MemoryPage;
