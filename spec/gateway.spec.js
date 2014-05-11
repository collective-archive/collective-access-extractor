Gateway = require('../lib/gateway')

describe("Gateway", function() {
  beforeEach(function() {
    this.params = {
      url:      'http://archive.collectivearchivepgh.org/',
      username: 'api',
      password: 'api123'
    };
    this.gateway = new Gateway(this.params);
  });

  it("can fetch a single item", function(done) {
    var test = this;

    this.gateway.getObject(1, function(err, id, item) {
      if(err) {
        test.fail(err);
        done();
      }

      console.log(item);
      expect(id).toEqual(1);
      done();
    });
  });
});
