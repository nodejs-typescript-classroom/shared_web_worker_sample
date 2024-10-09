const http = require('http');
// create Worker Pool
const RpcWorkerPool = require('./rpc-worker.js');
// create dispatch worker
const worker = new RpcWorkerPool(__dirname+'/worker.js', 
  Number(process.env.THREADS),
  process.env.STRATEGY,
);
const server = http.createServer(async (req, res) => {
  const value = Math.floor(Math.random() * 10_000_000);
  const sum = await worker.exec('square_sum', value);
  res.end(JSON.stringify({ sum, value}));
});
server.listen(1337, (err) => {
  if (err) throw err;
  console.log('listen on 1337');
})