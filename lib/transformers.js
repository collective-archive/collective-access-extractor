_ = require('underscore');

addressTransformer = function(addressData) {
  return _.extend({}, addressData.none);
}

measurementsTransformer = function(measurementData) {
  var newObject = {};

  _.each(measurementData, function(m) {
    newObject[m.none.measurementsType] = m.none.measurements;
  });

  return newObject;
}

entityTransformer = function(data) {
  return {
    id:          data.entity_id.value,
    idNumber:    data.idno.value,
    displayName: data.preferred_labels.en_US[0],
    addresses:   _.map(data['ca_entities.address'], addressTransformer)
  }
};

objectTransformer = function(data) {
  return {
    id: data.object_id.value,
    idNumber:    data.idno.value,
    displayName: data.preferred_labels.en_US[0],
    material: data["ca_objects.materialSet"][0].en_US.material,
    measurements: measurementsTransformer(data["ca_objects.measurementSet"])
  }
};

module.exports = {
  entityTransformer: { transform: entityTransformer },
  objectTransformer: { transform: objectTransformer }
}
