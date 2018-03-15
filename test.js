console.log('Initializing...');
// require jserver lib
const jserver = require('./lib/JServer');
// create server instance
const server = new jserver.TJServer;

// routes
console.log('Load Routes json...');
const routes = require('./routes.json');

// controllers
console.log('Import Controllers...');
// const ctls = require('./controller');
server.addControllers(require('./controller'));

// import
console.log('Import Routes...');
server.addRoutes(routes);

// start server
console.log('Starting server...');
server.listen(8080);

// event handler
server.on('listening', function() {
  console.log('Server Started at 8080.')
});