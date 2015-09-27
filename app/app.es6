let GameboyEmulator = require('gameboy_emulator');

function pageReady() {
  // Create the cpu worker script element
  // If anyone knows a nicer way to do this, i'd be super
  // keen to here it
  var element = document.createElement("script");
  element.type="text/js-worker";
  element.innerHTML = `
var window = self;
importScripts('http://localhost:3333/app.js');
var worker = (new (require('worker')));
onmessage = (m) => { worker.onMessage(m) };
worker.start();`;

  document.querySelector("body").appendChild(element);

  let blob = new Blob(Array.prototype.map.call(document.querySelectorAll("script[type=\"text/js-worker\"]"), (o) => { return o.textContent; }), {type: "text/javascript"});
  var worker = new Worker(URL.createObjectURL(blob));

  window.emulator = new GameboyEmulator(worker);
  window.emulator.start();
}

module.exports = pageReady;
