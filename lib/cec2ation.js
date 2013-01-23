var cronJob = require('cron').CronJob,
	aws = require('aws-sdk'),
	_ = require('underscore');

var cec2ation = {};

cec2ation.startInstanceJob = function(config) { 
	return new cronJob(config.start, function() { 
		return cec2ation.startInstance(config); 
	});
};

cec2ation.stopInstanceJob = function(config) { 
	return new cronJob(config.stop, function() { 
		return cec2ation.stopInstance(config); 
	}, null, false, 'Europe/London');
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

	cec2ation.getInstances(config, function(e, instances) {
		if(e) {
			console.error(e);
			return;
		}

		cec2ation.getEC2Client(config).stopInstances({InstanceIds : instances}, function(e, result) {
			if(e) {
				return console.error(e, result);
			}

			var instancesStopped = _.reduce(result.StoppingInstances, function(memo, instance) { return memo + instance.InstanceId + ' '; }, '');
			return console.log('matched instances: ' + instancesStopped);
		});
	});
};

cec2ation.getInstances = function(config, done) {
	cec2ation.getEC2Client(config).describeInstances(config.instances, function(e, data) {
		if(e) {
			return done(e);
		}

		return done(null, _.map(data.Reservations[0].Instances, function(instance){ return instance.InstanceId; }));
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
};

module.exports = cec2ation;
