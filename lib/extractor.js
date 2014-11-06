/**
 * A utility to extract the contents of a Collective Access archive.
 *
 * @package collective-access-extractor
 * @author Chris Geihsler <chris@geihsler.net>
 */

_            = require('underscore');
Gateway      = require('./gateway');

fetchAllRecords = function(connectionInfo, itemCallback, batchCompleteCallback) {
  var gateway = new Gateway(connectionInfo);

  var options = {};
  var entitiesDone = false;
  var objectsDone = false;
  var occurrencesDone = false;

  gateway.getAllModels('ca_entities', function(err, results) {
    if (err){
      batchCompleteCallback(err);
      return;
    }

    var ids = _.map(results, function(result){
      return result.entity_id
    });

    options.entities = ids;
    entitiesDone = true;
    checkIfDone();
  });

  gateway.getAllModels('ca_objects', function(err, results) {
    if (err){
      batchCompleteCallback(err);
      return;
    }

    var ids = _.map(results, function(result){
      return result.object_id
    });

    options.objects = ids;
    objectsDone = true;
    checkIfDone();
  });

  gateway.getAllModels('ca_occurrences', function(err, results) {
    if (err){
      batchCompleteCallback(err);
      return;
    }

    var ids = _.map(results, function(result){
      return result.occurrence_id
    });

    options.occurrences = ids;
    occurencesDone = true;
    checkIfDone();
  });

  function checkIfDone() {
    if( entitiesDone && objectsDone) {
      fetchBatch(connectionInfo, options, itemCallback, batchCompleteCallback);
    }
  }
}

fetchBatch = function(connectionInfo, options, itemCallback, batchCompleteCallback) {
  var gateway        = new Gateway(connectionInfo);
  var recordsToFetch = options.entities.length + options.objects.length + options.occurrences.length;

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

    itemCallback(err, id, 'entity', body);
    checkIfDone();
  }

  function objectFetched(err, id, body) {
    if(err) {
      itemCallback(err, id);
      checkIfDone();
      return;
    }

    itemCallback(err, id, 'object', body);
    checkIfDone();
  }

  function occurrenceFetched(err, id, body) {
    if(err) {
      itemCallback(err, id);
      checkIfDone();
      return;
    }

    itemCallback(err, id, 'occurrence', body);
    checkIfDone();
  }

  _.each(options.entities, function(id) { gateway.getItem(id, entityFetched);   });
  _.each(options.objects,  function(id) { gateway.getObject(id, objectFetched); });
  _.each(options.occurrences, function(id) { gateway.getOccurrence(id, occurrenceFetched); });
};

module.exports = {
  fetchAllRecords: fetchAllRecords,
  fetchBatch: fetchBatch
}
