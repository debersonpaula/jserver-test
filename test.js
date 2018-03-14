console.log('Initializing...');
// require jserver lib
const jserver = require('./lib/JServer');
// create server instance
const server = new jserver.TJServer;

// routes
const routes = [
  {route: 'user', handler: () => { return { message: 'user'} }},
  {route: 'info', handler: () => { return { message: 'info'}}, routes: [
    {route: 'name', handler: () => { return { submessage: 'info/a'}}}
  ]},
];

server.addRoutes(routes);
server.defaultRoute = {
  handler: function () {
    return { message: 'home'};
  }
};

// start server
server.listen(8080);

// controllers
function UserController() {
  
}