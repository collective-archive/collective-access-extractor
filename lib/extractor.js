/**
 * A utility to extract the contents of a Collective Access archive.
 *
 * @package collective-access-extractor
 * @author Chris Geihsler <chris@geihsler.net>
 */

_            = require('underscore');
Gateway      = require('./gateway');

fetchAllRecords = function(connectionInfo, types, itemCallback, batchCompleteCallback) {
  var gateway = new Gateway(connectionInfo);

  var options = {};

  function entitiesDone(ids) {
    options.entities = ids;
    checkIfDone();
  }

  if(_.includes(types, 'entities')) {
    gateway.getAllModels('ca_entities', function(err, results) {
      if (err){
        batchCompleteCallback(err);
        return;
      }

      var ids = _.map(results, function(result){
        return result.entity_id
      });

      entitiesDone(ids);
    });
  }
  else {
    entitiesDone([]);
  }

  function objectsDone(ids) {
    options.objects = ids;
    checkIfDone();
  }

  if(_.includes(types, 'objects')) {
    gateway.getAllModels('ca_objects', function(err, results) {
      if (err){
        batchCompleteCallback(err);
        return;
      }

      var ids = _.map(results, function(result){
        return result.object_id
      });

      objectsDone(ids);
    });
  }
  else {
    objectsDone([]);
  }

  function occurrencesDone(ids) {
    options.occurrences = ids;
    checkIfDone();
  }

  if(_.includes(types, 'occurrences')) {
    gateway.getAllModels('ca_occurrences', function(err, results) {
      if (err){
        batchCompleteCallback(err);
        return;
      }

      var ids = _.map(results, function(result){
        return result.occurrence_id
      });

      occurrencesDone(ids);
    });
  }
  else {
    occurrencesDone([]);
  }

  function collectionsDone(ids) {
    options.collections = ids;
    checkIfDone();
  }

  if(_.includes(types, 'collections')) {
    gateway.getAllModels('ca_collections', function(err, results) {
      if (err){
        batchCompleteCallback(err);
        return;
      }

      var ids = _.map(results, function(result){
        return result.collection_id;
      });

      collectionsDone(ids);
    });
  }
  else {
    collectionsDone([]);
  }

  function checkIfDone() {
    if( options.hasOwnProperty('entities') &&
        options.hasOwnProperty('objects') &&
        options.hasOwnProperty('occurrences') &&
        options.hasOwnProperty('collections')) {
      fetchBatch(connectionInfo, options, itemCallback, batchCompleteCallback);
    }
  }
}

fetchBatch = function(connectionInfo, options, itemCallback, batchCompleteCallback) {
  var gateway        = new Gateway(connectionInfo);
  var recordsToFetch = options.entities.length + options.objects.length + options.occurrences.length + options.collections.length;

  function checkIfDone() {
    recordsToFetch--;

    if(recordsToFetch == 0) {
      batchCompleteCallback();
    }
  }

  function buildFetchedCallback(type) {
    return function (err, id, body) {
      if(err) {
        itemCallback(err, id, type);
        checkIfDone();
        return;
      }

      itemCallback(err, id, type, body);
      checkIfDone();
    }
  }

  var entityFetched     = buildFetchedCallback('entity');
  var objectFetched     = buildFetchedCallback('object');
  var occurrenceFetched = buildFetchedCallback('occurrence');
  var collectionFetched = buildFetchedCallback('collection');

  _.each(options.entities,    function(id) { gateway.getItem(id, entityFetched);           });
  _.each(options.objects,     function(id) { gateway.getObject(id, objectFetched);         });
  _.each(options.occurrences, function(id) { gateway.getOccurrence(id, occurrenceFetched); });
  _.each(options.collections, function(id) { gateway.getCollection(id, collectionFetched); });
};

module.exports = {
  fetchAllRecords: fetchAllRecords,
  fetchBatch: fetchBatch
}
