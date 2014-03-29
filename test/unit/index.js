var test = require('tap').test,
extractor = require(__dirname + '/../../lib/index.js');

extractor(function (err) {
  test('unit', function (t) {
    t.equal(err, null, 'error object is null');
    t.end();
  });
});
