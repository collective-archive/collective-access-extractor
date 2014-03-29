request = require('request-json');

Gateway = (function() {
  function Gateway(params) {
    this.client = request.newClient(params.url);
    this.client.setBasicAuth(params.username, params.password);
  }

  Gateway.prototype.getItem = function(entityId, callback) {
    this.client.get('/service.php/item/ca_entities/id/' + entityId, function(err, res, body) {
      if(err) {
        callback(err);
        return;
      }

      if(body.ok !== true) {
        callback(new Error("CA return an error."));
        return;
      }

      callback(err, body);
    });
  }

  return Gateway;
})();

module.exports = Gateway;
