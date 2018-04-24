const assert = require('assert');
const MockServer  = require('../../../lib/mockserver.js');
const CommandGlobals = require('../../../lib/globals/commands.js');

describe('moveToElement', function() {
  beforeEach(function(done) {
    CommandGlobals.beforeEach.call(this, done);
  });

  afterEach(function(done) {
    CommandGlobals.afterEach.call(this, done);
  });

  it('client.moveToElement()', function(done) {
    MockServer.addMock({
      url : '/wd/hub/session/1352110219202/moveto',
      method:'POST',
      postdata: '{"element":"0"}',
      response : JSON.stringify({
        sessionId: '1352110219202',
        status: 0
      })
    });

    this.client.api.moveTo('css selector', '#weblogin', null, null, function callback(result) {
      assert.equal(result.status, 0);
    }).moveToElement('#weblogin', null, null, function callback(result) {
      assert.equal(result.status, 0);
    });

    this.client.start(done);
  });
});
