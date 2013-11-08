var cec2ation = require('./lib/cec2ation.js');

/*

* * * * *
- - - - -
| | | | |
| | | | +----- day of week (0-6) (Sunday=0)
| | | +------- month (1-12)
| | +--------- day of month (1-31)
| +----------- hour (0-23)
+------------- min (0-59)

*/

var config = { 
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY,
	region: process.env.AWS_REGION,
	stop: '00 00 02 * * *',
	instances: {
		Filters: [{
			Name: 'tag:cec2ation',
			Values: ['off at 2am']
		}]
	}
};

cec2ation.configure(config);
