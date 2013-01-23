var cec2ation = require('../lib/cec2ation.js'),
	assert = require('assert'),
	mocha = require('mocha'),
	sinon = require('sinon');


describe('when configure called', function() {
	var startInstanceJobStub = sinon.stub();
	var stopInstanceJobStub = sinon.stub();
	var config;

	beforeEach(function() {
		config = {
			start: 'START',
			stop: 'STOP',
			instances: []
		};

		startInstanceJobStub.start = sinon.stub();
		stopInstanceJobStub.start = sinon.stub();
		sinon.stub(cec2ation, 'startInstanceJob').returns(startInstanceJobStub);
		sinon.stub(cec2ation, 'stopInstanceJob').returns(stopInstanceJobStub);
		cec2ation.configure(config);
	});

	afterEach(function() {
		cec2ation.startInstanceJob.restore();
		cec2ation.stopInstanceJob.restore();
	});

	it('should start startInstanceJob', function() {
		assert(cec2ation.startInstanceJob.calledWithExactly(config));
		assert(cec2ation.startInstanceJob.calledOnce);
		assert(startInstanceJobStub.start.calledOnce);
	});

	it('should start stopInstanceJob', function() {
		assert(cec2ation.stopInstanceJob.calledWithExactly(config));
		assert(cec2ation.stopInstanceJob.calledOnce);
		assert(stopInstanceJobStub.start.calledOnce);
	});
});

describe('when calling startInstanceJob', function() {
	var job;
	var config;
	beforeEach(function() {
		config = {
			start : '0 0 0 0 0 0'
		}

		sinon.stub(cec2ation, 'startInstance');
		job = cec2ation.startInstanceJob(config);
	});

	afterEach(function() {
		cec2ation.startInstance.restore();
	})

	it('should set time correctly', function() {
		assert.equal('0 0 0 0 0 0', job.cronTime.source);
	});

	it('should set callback correctly', function() {
		assert.equal(1, job._callbacks.length);
		job._callbacks[0]();
		assert(cec2ation.startInstance.calledOnce);
		assert(cec2ation.startInstance.calledWithExactly(config));
	});
});

describe('when calling stopInstanceJob', function() {
	var job;
	var config;
	
	beforeEach(function() {
		config = {
			stop: '0 0 0 0 0 0'
		};

		sinon.stub(cec2ation, 'stopInstance');
		job = cec2ation.stopInstanceJob(config);
	});

	afterEach(function() {
		cec2ation.stopInstance.restore();
	})

	it('should set time correctly', function() {
		assert.equal('0 0 0 0 0 0', job.cronTime.source);
	});

	it('should set callback correctly', function() {
		assert.equal(1, job._callbacks.length);
		job._callbacks[0]();
		assert(cec2ation.stopInstance.calledOnce);
		assert(cec2ation.stopInstance.calledWithExactly(config));
	});
});

describe('when calling getEC2Client', function() {
	var config;
	var client;
	
	beforeEach(function() {
		config = {
			accessKeyId: 'ACCESSKEYID',
			secretAccessKey: 'SECRETACCESSKEY',
			region: 'REGION'
		};

		client = cec2ation.getEC2Client(config);
	});

	it('should set accesskey', function() {
		assert.equal(config.accessKeyId, client.config.credentials.accessKeyId);
	});

	it('should set secretAccessKey', function() {
		assert.equal(config.secretAccessKey, client.config.credentials.secretAccessKey);
	});

	it('should set region', function() {
		assert.equal(config.region, client.config.region);
	});
});

describe('when calling stopInstance', function() {
	
	var client;
	var config;
	var instances;
	
	beforeEach(function() {
		client = sinon.stub();
		client.stopInstances = sinon.stub();

		sinon.stub(cec2ation, 'getEC2Client').returns(client);
		sinon.stub(cec2ation, 'getInstances').yields(null, instances);
		cec2ation.stopInstance(config);
	});	

	afterEach(function() {
		cec2ation.getEC2Client.restore();
		cec2ation.getInstances.restore();
	});

	it('should call getInstances', function() {
		assert(cec2ation.getInstances.calledOnce);
		assert(cec2ation.getInstances.calledWith(config));
	});

	it('should call stopInstances', function() {
		assert(client.stopInstances.calledOnce);
		assert(client.stopInstances.calledWith({InstanceIds : instances}));
	});
});

describe('when calling getInstances', function() {
	var client;
	var config;

	beforeEach(function() {
		config = {
			instances: "INSTANCES"
		};

		client = sinon.stub();
		client.describeInstances = sinon.stub();

		sinon.stub(cec2ation, 'getEC2Client').returns(client);
		client.describeInstances.yields(null, {
			Reservations : [ {
				Instances : [ {
					InstanceId: 'A'
				},{
					InstanceId: 'B'
				}]
			}]
		});
	});

	it('should return expected', function(done) {
		cec2ation.getInstances(config, function(e, instances) {			
			assert.deepEqual(['A', 'B'], instances);
			done(e, instances);
		});
	});
});

