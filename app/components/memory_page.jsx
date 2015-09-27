let Util = require('util');

let MemoryPage = React.createClass({
  render: function() {
    let rows = [];

    for(let i = 0; i < 512; i += 8) {
      let row = [];

      for(let j = 0; j < 8; j++) {
        row.push(Util.hex(this.props.page.memory[i+j]) + " ");
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
