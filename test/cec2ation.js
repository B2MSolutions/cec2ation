var cec2ation = require('../lib/cec2ation.js'),
	assert = require('assert'),
	mocha = require('mocha'),
	sinon = require('sinon');


describe('when startAll called', function() {
	var startInstanceJobStub = sinon.stub();
	var stopInstanceJobStub = sinon.stub();

	beforeEach(function() {
		startInstanceJobStub.start = sinon.stub();
		stopInstanceJobStub.start = sinon.stub();
		sinon.stub(cec2ation, 'startInstanceJob').returns(startInstanceJobStub);
		sinon.stub(cec2ation, 'stopInstanceJob').returns(stopInstanceJobStub);
		cec2ation.startAll();
	});

	afterEach(function() {
		cec2ation.startInstanceJob.restore();
		cec2ation.stopInstanceJob.restore();
	});

	it('should start startInstanceJob', function() {
		assert(startInstanceJobStub.start.calledOnce);
	});

	it('should start stopInstanceJob', function() {
		assert(stopInstanceJobStub.start.calledOnce);
	});
});

describe('when calling startInstanceJob', function() {
	var job;
	beforeEach(function() {
		job = cec2ation.startInstanceJob();
	});

	it('should set time correctly', function() {
		assert.equal('0 0 * * * 1', job.cronTime.source);
	});

	it('should set callback correctly', function() {
		assert.equal(1, job._callbacks.length);
		assert.equal(cec2ation.startInstance, job._callbacks[0]);
	});
});

describe('when calling stopInstanceJob', function() {
	var job;
	beforeEach(function() {
		job = cec2ation.stopInstanceJob();
	});

	it('should set time correctly', function() {
		assert.equal('0 0 * * * 6', job.cronTime.source);
	});

	it('should set callback correctly', function() {
		assert.equal(1, job._callbacks.length);
		assert.equal(cec2ation.stopInstance, job._callbacks[0]);
	});
});
