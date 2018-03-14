function test1() {
  console.log('test1');
}
function test2() {
  console.log('test2');
}

let funcs = { test1 };
funcs = {...funcs, test2}

funcs['test1']();
funcs['test2']();