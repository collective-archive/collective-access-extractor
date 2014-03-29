Gateway = require('../lib/gateway')

describe("Gateway", function() {
  beforeEach(function() {
    this.params = {
      url:      'http://162.243.52.198/',
      username: 'api',
      password: 'api123'
    };
    this.gateway = new Gateway(this.params);
  });

  it("can fetch a single item", function(done) {
    this.gateway.getItem(1, function(err, item) {
      console.log(item);
      done();
    });
  });
});
