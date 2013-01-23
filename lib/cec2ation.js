var cronJob = require('cron').CronJob,
	aws = require('aws-sdk');

var cec2ation = {};

cec2ation.startInstanceJob = function(config) { 
	return new cronJob(config.start, function() { 
		return cec2ation.startInstance(config); 
	});
};

cec2ation.stopInstanceJob = function(config) { 
	return new cronJob(config.stop, function() { 
		return cec2ation.stopInstance(config); 
	});
};

cec2ation.configure = function(config) {
	if(config.start) {
		cec2ation.startInstanceJob(config).start();	
	}

	if(config.stop) {
		cec2ation.stopInstanceJob(config).start();	
	}
};

cec2ation.startInstance = function(config) {
	console.log('starting instances - not implemented');
};

cec2ation.stopInstance = function(config) {
	console.log('stopping instances');
	cec2ation.getEC2Client(config).stopInstances({InstanceIds : config.instances}, function(err, data) {
		if(err) {
			return console.error(err, data);
		}

		return console.log(data);
	});
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
