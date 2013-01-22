var cronJob = require('cron').CronJob;

var cec2ation = {};

cec2ation.job = function() { return new cronJob('* * * * * *', cec2ation.act) };

cec2ation.start = function() {
	console.log('starting...');
	cec2ation.job().start();
};

cec2ation.act = function() {
	console.log('acting...');
};

module.exports = cec2ation;
