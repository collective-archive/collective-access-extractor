Gateway = require('../lib/gateway')
Extractor = require('../lib/extractor')

describe("Gateway", function() {
  beforeEach(function() {
    this.params = {
      url:      'http://archive.collectivearchivepgh.org/',
      username: 'api',
      password: 'api123'
    };
    this.gateway = new Gateway(this.params);
  });

  it("can fetch all the records", function(done) {
    Extractor.fetchAllRecords(this.params, function(err, id, type, data){console.log(data);}, function(){done();})
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
