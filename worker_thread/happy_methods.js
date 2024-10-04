const crypto = require('crypto');
function random64() {
  const big64arr = new BigUint64Array(1);
  crypto.randomFillSync(big64arr);
  return big64arr[0];
}
function sumDigitsSignature(num) {
  let total = 0n;
  while (num > 0) {
    const numModBase = num % 10n;
    total += numModBase ** 2n;
    num = num / 10n;
  }
  return total;
}
function isHappy(num){
  while(num!= 1n && num != 4n) {
    num = sumDigitsSignature(num);
  }
  return num === 1n;
}

function isHappycoin(num) {
  return isHappy(num) && num % 10000n === 0n;
}
module.exports = {
  isHappycoin,
  random64
}