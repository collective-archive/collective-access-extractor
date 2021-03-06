_ = require('underscore');

objectProperty = function(data, name) {
  var key    = "ca_objects." + name;
  var objects = data[key];

  english = caObjectTransformer(objects);

  if (english === undefined) {
    return;
  }

  return english[name];
};

addressTransformer = function(addressData) {
  return _.extend({}, addressData.none);
}

caObjectTransformer = function(data) {
  if(data === undefined) {
    return;
  }

  var first = data[0];

  if(first === undefined) {
    return;
  }

  if (first.en_US) {
      data = first.en_US;
  } else if (first.none) {
      data = first.none;
  } else {
      return;
  }

  return data;
}

relationshipTransformer = function(relationshipData) {
  var ARTIST_CODE = 'had as artist';
  var relationships = [];

  if(relationshipData == undefined) {
    return [];
  }

  var transformRelationshipType = function(relationshipType) {
    if(relationshipType === ARTIST_CODE) {
      return 'artist';
    }

    return relationshipType;
  };

  if(relationshipData.ca_objects !== undefined) {
    objects = _.map(relationshipData.ca_objects, function(object) {
      return {
        id: object.object_id,
        type: 'object',
        label: object.label,
        relationship: transformRelationshipType(object.relationship_typename)
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
        relationship: transformRelationshipType(entity.relationship_typename)
      };
    });

    relationships = relationships.concat(objects);
  }

  return relationships;
}

representationTransformer = function(data) {
  return {
    id:  data.representation_id,
    url: data.urls.medium
  };
}

representationsTransformer = function(data) {
  var results = [];

  for(var id in data) {
    results.push(representationTransformer(data[id]));
  }

  return results;
}


entityTransformer = function(data) {
  return {
    id:            data.entity_id.value,
    idNumber:      data.idno.value,
    displayName:   data.preferred_labels.en_US[0],
    addresses:     _.map(data['ca_entities.address'], addressTransformer),
    relationships: relationshipTransformer(data.related)
  }
};

objectTransformer = function(data) {
  var relationships = relationshipTransformer(data.related);

  return {
    id:              data.object_id.value,
    idNumber:        data.idno.value,
    displayName:     data.preferred_labels.en_US[0],
    material:        objectProperty(data, "materials"),
    measurements:    undefined,
    workType:        undefined,
    culture:         undefined,
    relationships:   _.filter(relationships, function (relationship) { return relationship.relationship !== 'artist'; }),
    artists:         _.filter(relationships, function (relationship) { return relationship.relationship === 'artist'; }),
    representations: representationsTransformer(data.representations)
  }
};

module.exports = {
  entityTransformer: { transform: entityTransformer },
  objectTransformer: { transform: objectTransformer }
}
