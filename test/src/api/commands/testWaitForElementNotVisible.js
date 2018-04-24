const assert = require('assert');
const MockServer  = require('../../../lib/mockserver.js');
const CommandGlobals = require('../../../lib/globals/commands.js');

describe('waitForElementNotVisible', function() {
  beforeEach(function(done) {
    CommandGlobals.beforeEach.call(this, done);
  });

  afterEach(function(done) {
    MockServer.removeMock({
      url : '/wd/hub/session/1352110219202/element/0/displayed',
      method:'GET'
    });
    CommandGlobals.afterEach.call(this, done);
  });

  it('client.waitForElementNotVisible() success', function(done) {
    var assertion = [];

    MockServer.addMock({
      url : '/wd/hub/session/1352110219202/element/0/displayed',
      method:'GET',
      response : JSON.stringify({
        sessionId: '1352110219202',
        status:0,
        value : false
      })
    });

    this.client.assertion = function(result, actual, expected, msg, abortObFailure) {
      Array.prototype.unshift.apply(assertion, arguments);
    };

    this.client.api.globals.abortOnAssertionFailure = false;
      this.client.api.waitForElementNotVisible('#weblogin', 110, 50, function callback(result, instance) {
      assert.equal(assertion[0], true);
      assert.equal(assertion[4], false);
    });

    this.client.start(done);
  });

  it('client.waitForElementNotVisible() failure', function(done) {
    var assertion = [];

    MockServer.addMock({
      url : '/wd/hub/session/1352110219202/element/0/displayed',
      method:'GET',
      response : JSON.stringify({
        sessionId: '1352110219202',
        status:0,
        value : true
      })
    });

    this.client.api.globals.abortOnAssertionFailure = true;
    this.client.assertion = function(result, actual, expected, msg, abortObFailure) {
      Array.prototype.unshift.apply(assertion, arguments);
    };

    this.client.api.waitForElementNotVisible('#weblogin', 15, 10, function callback(result) {
      assert.equal(assertion[0], false);
      assert.equal(assertion[1], 'visible');
      assert.equal(assertion[2], 'not visible');
      assert.equal(assertion[3], 'Timed out while waiting for element <#weblogin> to not be visible for 15 milliseconds.');
      assert.equal(assertion[4], true); // abortOnFailure
      assert.equal(result.status, 0);
    });

    this.client.start(done);
  });
});

