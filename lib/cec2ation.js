var cronJob = require('cron').CronJob,
	aws = require('aws-sdk');

var cec2ation = {};

cec2ation.startInstanceJob = function(cronTime) { return new cronJob(cronTime, cec2ation.startInstance) };

cec2ation.stopInstanceJob = function(cronTime) { return new cronJob(cronTime, cec2ation.stopInstance) };

cec2ation.configure = function(startCronTime, stopCronTime) {
	cec2ation.startInstanceJob(startCronTime).start();
	cec2ation.stopInstanceJob(stopCronTime).start();
};

cec2ation.startInstance = function() {
};

cec2ation.stopInstance = function() {
};

module.exports = cec2ation;
