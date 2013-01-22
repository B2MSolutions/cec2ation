var cronJob = require('cron').CronJob,
	aws = require('aws-sdk');

var cec2ation = {};

cec2ation.startInstanceJob = function(cronTime) { return new cronJob(cronTime, cec2ation.startInstance) };

cec2ation.stopInstanceJob = function(cronTime) { return new cronJob(cronTime, cec2ation.stopInstance) };

cec2ation.configure = function(startCronTime, stopCronTime, config) {
	cec2ation.startInstanceJob(startCronTime).start();
	cec2ation.stopInstanceJob(stopCronTime).start();
	// cec2ation.getEC2Client(config).describeInstances(function(err, data) {
	// 	console.log(data);
	// });
};

cec2ation.startInstance = function() {
};

cec2ation.stopInstance = function() {
};

cec2ation.getEC2Client = function(config) {
	var ec2Config = { 
		credentials: { 
			accessKeyId: config.accessKeyId,
        	secretAccessKey: config.secretAccessKey
        },
     	region: config.region,
     	sslEnabled: true,
     	s3ForcePathStyle: false 
     };

	return new aws.EC2.Client(ec2Config);
}

module.exports = cec2ation;
