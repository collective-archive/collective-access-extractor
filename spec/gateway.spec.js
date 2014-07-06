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
    Extractor.fetchAllRecords(this.params, function(err, id, type, data) {
      if(err) {
        console.log("Error:" + err);
        test.fail(err);
        done();
      }
    }, function(){
      done();
    })
  }, 10000);

  it("can fetch a single item", function(done) {
    var test = this;

    this.gateway.getObject(1, function(err, id, item) {
      if(err) {
        console.log(err);
        test.fail(err);
        done();
      }

      console.log(item);
      expect(id).toEqual(1);
      done();
    });
  });
});
