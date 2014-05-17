request = require('request-json');

Gateway = (function() {
  function Gateway(params) {
    this.client = request.newClient(params.url);
    this.client.setBasicAuth(params.username, params.password);
  }

  Gateway.prototype.getItem = function(id, callback) {
    this.client.get('/service.php/item/ca_entities/id/' + id, function(err, res, body) {
      if(err) {
        callback(err, id);
        return;
      }

      if(body.ok !== true) {
        callback(new Error("CA returned an error."), id);
        return;
      }

      callback(err, id, body);
    });
  }

  Gateway.prototype.getObject = function(id, callback) {
    this.client.get('/service.php/item/ca_objects/id/' + id, function(err, res, body) {
      if(err) {
        callback(err, id);
        return;
      }

      if(body.ok !== true) {
        callback(new Error("CA returned an error."), id);
        return;
      }

      callback(err, id, body);
    });
  }

  Gateway.prototype.getObjects = function(callback) {
    this.client.get('/service.php/model/ca_objects', function(err, body) {
      if (body) {
        body = JSON.parse(body.body);
      }

      if(err) {
        callback(err);
      }

      if(body.ok !== true) {
        callback(new Error("CA returned an error."));
        return;
      }

      callback(err, body);
    });
  }

  Gateway.prototype.getEntities = function(callback) {
    this.client.get('/service.php/model/ca_entities', function(err, body) {
      if (body) {
        body = JSON.parse(body.body);
      }

      if(err) {
        callback(err);
      }

      if(body.ok !== true) {
        callback(new Error("CA returned an error."));
        return;
      }

      callback(err, body);
    });
  }

  return Gateway;
})();

module.exports = Gateway;
