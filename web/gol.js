const BLACK = 0xFF000000;
const WHITE = 0xFFFFFFFF;
const SIZE = 1000;
const iterationCounter = document.getElementById('iteration');
const gridCanvas = document.getElementById('gridcanvas');
gridCanvas.height = SIZE;
gridCanvas.width = SIZE;
const ctx = gridCanvas.getContext('2d');
const data = ctx.createImageData(SIZE, SIZE);
const buf = new Uint32Array(data.data.buffer);
function paint(cell, x, y) {
  buf[SIZE*x+y] = cell ? BLACK: WHITE;
}
const grid = new Grid(SIZE, new ArrayBuffer(2*SIZE*SIZE), paint);
for (let x = 0; x < 1000; x++) {
  for (let y = 0; y < 1000; y++) {
    const cell = Math.random() < 0.5 ? 0: 1;
    grid.cells[SIZE * x + y] = cell;
    paint(cell, x, y);
  }  
}

let iteration = 0;
function iterate(...args) {
  grid.iterate(...args);
  ctx.putImageData(data, 0, 0);
  iterationCounter.innerHTML = ++iteration;
  window.requestAnimationFrame(() => iterate(...args));
}

iterate(0, 0, SIZE, SIZE);