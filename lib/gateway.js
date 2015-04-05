request = require('request-json');

Gateway = (function() {
  function Gateway(params) {
    this.client = request.newClient(params.url);
    this.client.setBasicAuth(params.username, params.password);
  }

  function buildRecordCallback(tableName) {
    return function(id, callback) {
      this.client.get('/service.php/item/' + tableName + '/id/' + id, function(err, res, body) {
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
  }

  Gateway.prototype.getItem       = buildRecordCallback('ca_entities');
  Gateway.prototype.getObject     = buildRecordCallback('ca_objects');
  Gateway.prototype.getOccurrence = buildRecordCallback('ca_occurrences');
  Gateway.prototype.getCollection = buildRecordCallback('ca_collections');

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
        console.log(body)
        callback(new Error("CA returned an error."));
        return;
      }

      callback(err, body.results);
    });
  }

  return Gateway;
})();

module.exports = Gateway;
