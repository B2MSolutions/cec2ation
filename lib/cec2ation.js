var cronJob = require('cron').CronJob;

var cec2ation = {};

cec2ation.startInstanceJob = function() { return new cronJob('0 0 * * * 1', cec2ation.startInstance) };

cec2ation.stopInstanceJob = function() { return new cronJob('0 0 * * * 6', cec2ation.stopInstance) };

cec2ation.startAll = function() {
	cec2ation.startInstanceJob().start();
	cec2ation.stopInstanceJob().start();
};

cec2ation.startInstance = function() {
};

cec2ation.stopInstance = function() {
};

module.exports = cec2ation;
