/**
 * A utility to extract the contents of a Collective Access archive.
 *
 * @package collective-access-extractor
 * @author Chris Geihsler <chris@geihsler.net>
 */

_            = require('underscore');
Gateway      = require('./gateway');
transformers = require('./transformers');

fetchBatch = function(connectionInfo, options, itemCallback, batchCompleteCallback) {
  var gateway        = new Gateway(connectionInfo);
  var recordsToFetch = options.entities.length + options.objects.length;

  function checkIfDone() {
    recordsToFetch--;

    if(recordsToFetch == 0) {
      batchCompleteCallback();
    }
  }

  function entityFetched(err, id, body) {
    if(err) {
      itemCallback(err, id);
      checkIfDone();
      return;
    }

    itemCallback(err, id, 'entity', transformers.entityTransformer.transform(body));
    checkIfDone();
  }

  function objectFetched(err, id, body) {
    if(err) {
      itemCallback(err, id);
      checkIfDone();
      return;
    }

    itemCallback(err, id, 'object', transformers.objectTransformer.transform(body));
    checkIfDone();
  }

  _.each(options.entities, function(id) { gateway.getItem(id, entityFetched);   });
  _.each(options.objects,  function(id) { gateway.getObject(id, objectFetched); });
};

module.exports = {
  fetchBatch: fetchBatch
}
