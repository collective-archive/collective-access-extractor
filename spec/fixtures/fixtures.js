fs = require('fs');

module.exports = {
  objectJson: fs.readFileSync('spec/fixtures/object_3.json'),
  entityJson: fs.readFileSync('spec/fixtures/entity_1.json')
};
