var cec2ation = require('./lib/cec2ation.js');

//stop: '01 00 00 * * 6',
var config = { 
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY,
	region: process.env.AWS_REGION,
	stop: '00 35 15 * * 6',
	instances: {
		Filters: [{
			Name: 'tag:cec2ation',
			Values: ['on during weekdays']
		}]
	}
};

cec2ation.configure(config);
