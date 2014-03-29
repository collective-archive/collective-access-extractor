request = require('request-json');

Gateway = (function() {
  function Gateway(params) {
    this.client = request.newClient(params.url);
    this.client.setBasicAuth(params.username, params.password);
  }

  Gateway.prototype.getItem = function(entityId, callback) {
    this.client.get('/service.php/item/ca_entities/id/' + entityId, function(err, res, body) {
      if(err) {
        console.log('error: ', err);
        callback(err);
        return;
      }

      callback(err, body);
    });
  }

  return Gateway;
})();

module.exports = Gateway;
