const {
  Worker,
  isMainThread,
  parentPort
} = require('worker_threads');
const { random64, isHappycoin } = require('./happy_methods');
const THREAD_COUNT = 4;
const start = Date.now();
if (isMainThread) {
  let inFlight = THREAD_COUNT;
  let count = 0;
  for (let i = 0; i < THREAD_COUNT; i++) {
    const worker = new Worker(__filename);
    worker.on('message', msg => {
      if (msg === 'done') {
        if (--inFlight === 0) {
          process.stdout.write('\ncount ' + count + '\n');
          process.stdout.write('\nduration: ' + (Date.now() - start) + 'ms\n');
        }
      } else if (typeof msg === 'bigint'){
        process.stdout.write(msg.toString() + ' ');
        count++;
      }
    })
  }
} else {
  // worker
  for (let i = 1; i < 10_000_000/THREAD_COUNT; i++) {
    const randomNum = random64();
    if (isHappycoin(randomNum)) {
      parentPort.postMessage(randomNum);
    }
  }
  parentPort.postMessage('done');
}
