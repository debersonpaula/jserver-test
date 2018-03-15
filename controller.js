// controllers
const UserController = {
  
	getUser(req) {
		console.log('UserController/getUser > ', req);
  	return { message: 'user'};
	},

	count(req) {
		console.log('UserController/count > ', req);
  	return { message: 'count'};
	},

}


const InfoController = {
  
	getInfo(req) {
		console.log('InfoController/getInfo > ', req);
  	return { message: 'info'};
	},

}

module.exports = {
	UserController,
	InfoController
}