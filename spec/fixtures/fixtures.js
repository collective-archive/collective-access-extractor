fs = require('fs');

module.exports = {
  objectJson: fs.readFileSync('spec/fixtures/object_1.json'),
  entityJson: fs.readFileSync('spec/fixtures/entity_2.json')
};
