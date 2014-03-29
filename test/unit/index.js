var test = require('tap').test,
    collective\-access\-extractor = require(__dirname + '/../../lib/index.js');

collective\-access\-extractor(function (err) {
    test('unit', function (t) {
        t.equal(err, null, 'error object is null');
        t.end();
    });
});