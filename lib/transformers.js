_ = require('underscore');

addressTransformer = function(addressData) {
  return _.extend({}, addressData.none);
}

entityTransformer = function(data) {
  return {
    id:       data.entity_id.value,
    idNumber: data.idno.value,
    addresses: _.map(data['ca_entities.address'], addressTransformer)
  }
};

module.exports = {
  entityTransformer: { transform: entityTransformer }
}
