var cec2ation = require('./lib/cec2ation.js');

var config = { 
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY,
	region: process.env.AWS_REGION,
	instanceIds: []
};

cec2ation.configure('0 0 * * * 1', '0 0 * * * 6', config);