const Piscina = require('piscina');
const { random64, isHappycoin } = require('./happy_methods');
const THREAD_COUNT = 4;
const start = Date.now();
if (!Piscina.isWorkerThread) {
  const piscina = new Piscina({
    filename: __filename,
    minThreads: THREAD_COUNT,
    maxThreads: THREAD_COUNT,
  });
  let done = 0;
  let count = 0;
  for (let i = 0; i < THREAD_COUNT; i++) {
    (async () => {
      const { total, happycoins } = await piscina.run();
      process.stdout.write(happycoins);
      count += total;
      if (++done == THREAD_COUNT) {
        process.stdout.write('\ncount ' + count + '\n');
        process.stdout.write('\nduration: ' + (Date.now() - start) + 'ms\n');
      }
    })()
  }
}
module.exports = () => {
  let happycoins = '';
  let total = 0;
  for (let i = 0; i < 10_000_000/THREAD_COUNT; i++) {
    const randomNum = random64();
    if (isHappycoin(randomNum)) {
      happycoins += randomNum.toString() + ' ';
      total++;
    }
  }

  return {
    happycoins,
    total
  }
}