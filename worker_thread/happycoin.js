const { random64, isHappycoin } = require('./happy_methods');
let count = 0;
const start = Date.now();
for (let i = 0; i < 10_000_000; i++) {
  const randomNum = random64();
  if (isHappycoin(randomNum)) {
    process.stdout.write(randomNum.toString() + ' ');
    count++;
  }
}

process.stdout.write('\n count ' + count + '\n');
process.stdout.write('\n duration time:' + (Date.now() - start) +'ms\n');