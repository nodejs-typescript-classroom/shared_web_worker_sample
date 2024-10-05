if(!crossOriginIsolated) {
  throw new Error('Cannot used SharedArrayBuffer');
}
const worker = new Worker('shared-memory-worker.js');
const buffer = new SharedArrayBuffer(1024);
const view = new Uint8Array(buffer);
console.log('now', view[0]);
worker.postMessage(buffer);
setTimeout(() => {
  console.log('latter', view[0]);
  console.log('prop', buffer.foo);
}, 500);