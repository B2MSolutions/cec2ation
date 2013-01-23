var cec2ation = require('./lib/cec2ation.js');

var config = { 
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY,
	region: process.env.AWS_REGION,
	stop: '00 00 00 * * 6',
	instances: []
};

cec2ation.configure(config);