/**
 * A utility to extract the contents of a Collective Access archive.
 *
 * @package collective-access-extractor
 * @author Chris Geihsler <chris@geihsler.net>
 */

_            = require('underscore');
Gateway      = require('./gateway');
transformers = require('./transformers');

fetchBatch = function(connectionInfo, options, callback) {
  gateway = new Gateway(connectionInfo);

  _.each(options.objects, function(id) {
    gateway.getObject(id, function(err, body) {
      if(err) {
        callback(err);
        return;
      }

      callback(err, 'object', transformers.objectTransformer.transform(body));
    });
  });

  _.each(options.entities, function(id) {
    gateway.getItem(id, function(err, body) {
      if(err) {
        callback(err);
        return;
      }

      callback(err, 'entity', transformers.entityTransformer.transform(body));
    });
  });
};

module.exports = fetchBatch
