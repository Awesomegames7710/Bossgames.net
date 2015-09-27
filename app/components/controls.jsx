let Controls = React.createClass({
  play: function() {
    this.props.gameboy.play();
  },
  step: function() {
    this.props.gameboy.step();
  },
  render: function() {
    return (
      <header id="controls">
        <b>jsEmu[Gameboy]</b>

        <ul>
          <li><img src="reset.png" /></li>
          <li><a href="javascript:;" onClick={this.play}><img src="play.png" /></a></li>
          <li><img src="back.png" /></li>
          <li><a href="javascript:;" onClick={this.step}><img src="next.png" /></a></li>
        </ul>
      </header>
    );
  }
});

module.exports = Controls;
