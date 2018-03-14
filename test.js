console.log('Initializing...');
// require jserver lib
const jserver = require('./lib/JServer');
// create server instance
const server = new jserver.TJServer;

// routes
const routes = [
  {route: 'user', json: {user: 'username'}},
  {route: 'info', json: {info: 'some info'}},
];


// start server
server.listen(8080);