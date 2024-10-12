const Fastify = require('fastify');
const RpcWorkerPool = require('./rpc-worker');
const worker = new RpcWorkerPool(__dirname+'/template-worker.js', 4, 'leastbusy');
const template = require('./template');
const server = Fastify();

server.get('/main', async(request, reply) => template.renderLove({me: 'Thomas', you: 'Katelyn'}));

server.get('/offload', async(request, reply) => worker.exec('renderLove', {me: 'Thomas', you: 'Katelyn'}));

server.listen(3000, (err, address)=> {
  if (err) throw err;
  console.log(`listening on :${address}`);
});

const timer = process.hrtime.bigint;
setInterval(() => {
  const start = timer();
  setImmediate(() => {
    console.log(`delay: ${(timer() - start).toLocaleString()}ns`);
  })
}, 1000);