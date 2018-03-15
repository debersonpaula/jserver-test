// routes
// const routes = [
//   {
//     route: 'user',
//     handler: UserController,
//     routes: [
//       {route: 'count', handler: function(req) { return { sub: 'user/count' }}}
//     ]
//   },
//   {
//     route: 'info',
//     handler: NullController,
//     params: {
//       headers: ['name']
//     }
//   },
// ];

const routes = {
	'user': {
		'@handler': UserController,
		'count': {
			'@handler': function(req) { return { sub: 'user/count' }}
		},
	},
	'info': {
		'@handler': NullController,
		'@params': {
			headers: ['name']
		}
	}
};