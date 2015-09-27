let MemoryPage = require('components/memory_page');

let MemoryDebugger = React.createClass({
  getInitialState: function() {
    this.props.memory.attachOnChangedListener(this.memoryChanged);

    this.updateTimeout = null;

    return ({});
  },
  memoryChanged: function(index) {
    if(this.updateTimeout)
      clearTimeout(this.updateTimeout);

    this.updateTimeout = setTimeout(this.triggerRender, 1000);
  },
  triggerRender: function() {
    this.forceUpdate();
  },
  render: function() {
    let memoryPages = [];
    for(let p of this.props.memory.memoryPages) {
      memoryPages.push(<MemoryPage key={p.parentPageIndex} page={p} />);
    }
    return (
      <div id="memory">
        {memoryPages}
      </div>
    );
  }
});

module.exports = MemoryDebugger;
