const fs = require('fs/promises');
(async() => {
  const [wasm, wasmv1] = await Promise.all([
    fs.readFile(__dirname + '/add.wasm'),
    fs.readFile(__dirname + '/add_v1.wasm'),
  ]);
  const [{ instance: { exports: { add }}}, { instance: { exports: { add_v1 }}} ] = await Promise.all([
    WebAssembly.instantiate(wasm),
    WebAssembly.instantiate(wasmv1)
  ]);
  console.log(add(2, 3), add_v1(3,6));
})()