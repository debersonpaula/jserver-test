console.log('Initializing...');
// require jserver lib
const jserver = require('./lib/JServer');
// create server instance
const server = new jserver.TJServer;

// routes
const routes = [
  {
    route: 'user',
    handler: UserController,
    routes: [
      {route: 'count', handler: function(req) { return { sub: 'user/count' }}}
    ]
  },
  {
    route: 'info',
    handler: NullController,
    params: {
      headers: ['name']
    }
  },
];

server.addRoutes(routes);
server.defaultRoute = {handler: HomeController};

// start server
server.listen(8080);

// controllers
function HomeController(req) {
  console.log('HomeController > ', req);
  return { message: 'home'};
}

function UserController(req) {
  console.log('UserController > ', req);
  return { message: 'user'};
}

function NullController(req) {
  console.log('NullController > ', req);
  return { message: 'empty'};
}