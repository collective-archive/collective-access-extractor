_ = require('underscore');

addressTransformer = function(addressData) {
  return _.extend({}, addressData.none);
}

relationshipTransformer = function(relationshipData) {
  var relationships = [];

  if(relationshipData.ca_objects !== undefined) {
    objects = _.map(relationshipData.ca_objects, function(object) {
      return {
        id: object.object_id,
        type: 'object',
        label: object.label,
        relationship: object.relationship_typename
      };
    });

    relationships = relationships.concat(objects);
  }

  if(relationshipData.ca_entities !== undefined) {
    objects = _.map(relationshipData.ca_entities, function(entity) {
      return {
        id: entity.entity_id,
        type: 'entity',
        label: entity.label,
        relationship: entity.relationship_typename
      };
    });

    relationships = relationships.concat(objects);
  }

  return relationships;
}

entityTransformer = function(data) {
  return {
    id:          data.entity_id.value,
    idNumber:    data.idno.value,
    displayName: data.preferred_labels.en_US[0],
    addresses:   _.map(data['ca_entities.address'], addressTransformer),
    relationships: relationshipTransformer(data.related)
  }
};

objectTransformer = function(data) {
  return {
    id: data.object_id.value,
    idNumber:    data.idno.value,
    displayName: data.preferred_labels.en_US[0],
    material: data["ca_objects.materialDisplayText"][0].en_US.materialDisplayText,
    measurements: data["ca_objects.measurementDisplayText"][0].en_US.measurementDisplayText,
    relationships: relationshipTransformer(data.related)
  }
};

module.exports = {
  entityTransformer: { transform: entityTransformer },
  objectTransformer: { transform: objectTransformer }
}
