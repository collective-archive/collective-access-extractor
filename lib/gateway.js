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

  Gateway.prototype.getOccurrence = function(id, callback) {
    this.client.get('/service.php/item/ca_occurrences/id/' + id, function(err, res, body) {
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

  Gateway.prototype.getAllModels = function(model_name, callback) {
    this.client.get('/service.php/find/' + model_name + '?q=*', function(err, body) {
      if(err) {
        console.log(err);
        callback(err);
      }

      try {
        if (body) {
          body = JSON.parse(body.body);
        }
      }
      catch (e) {
        callback(e);
      }

      if(body.ok !== true) {
        callback(new Error("CA returned an error."));
        return;
      }

      callback(err, body.results);
    });
  }


  return Gateway;
})();

module.exports = Gateway;
