var cec2ation = require('../lib/cec2ation.js'),
	assert = require('assert'),
	mocha = require('mocha'),
	sinon = require('sinon');


describe('when configure called', function() {
	var startInstanceJobStub = sinon.stub();
	var stopInstanceJobStub = sinon.stub();

	beforeEach(function() {
		startInstanceJobStub.start = sinon.stub();
		stopInstanceJobStub.start = sinon.stub();
		sinon.stub(cec2ation, 'startInstanceJob').returns(startInstanceJobStub);
		sinon.stub(cec2ation, 'stopInstanceJob').returns(stopInstanceJobStub);
		cec2ation.configure('START', 'STOP');
	});

	afterEach(function() {
		cec2ation.startInstanceJob.restore();
		cec2ation.stopInstanceJob.restore();
	});

	it('should start startInstanceJob', function() {
		assert(cec2ation.startInstanceJob.calledWithExactly('START'));
		assert(cec2ation.startInstanceJob.calledOnce);
		assert(startInstanceJobStub.start.calledOnce);
	});

	it('should start stopInstanceJob', function() {
		assert(cec2ation.stopInstanceJob.calledWithExactly('STOP'));
		assert(cec2ation.stopInstanceJob.calledOnce);
		assert(stopInstanceJobStub.start.calledOnce);
	});
});

describe('when calling startInstanceJob', function() {
	var job;
	beforeEach(function() {
		job = cec2ation.startInstanceJob('0 0 0 0 0 0');
	});

	it('should set time correctly', function() {
		assert.equal('0 0 0 0 0 0', job.cronTime.source);
	});

	it('should set callback correctly', function() {
		assert.equal(1, job._callbacks.length);
		assert.equal(cec2ation.startInstance, job._callbacks[0]);
	});
});

describe('when calling stopInstanceJob', function() {
	var job;
	beforeEach(function() {
		job = cec2ation.stopInstanceJob('0 0 0 0 0 0');
	});

	it('should set time correctly', function() {
		assert.equal('0 0 0 0 0 0', job.cronTime.source);
	});

	it('should set callback correctly', function() {
		assert.equal(1, job._callbacks.length);
		assert.equal(cec2ation.stopInstance, job._callbacks[0]);
	});
});
