console.log('red');
const worker = new SharedWorker('shared-worker.js');
worker.port.onmessage = (event) => {
  console.log('EVENT', event.data);
};
window.addEventListener('beforeunload', () => {
  worker.port.postMessage('close');
});