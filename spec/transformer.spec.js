transformers = require('../lib/transformers');
fixtures     = require('./fixtures/fixtures')

describe("Transformers", function() {
  beforeEach(function() {
    this.sourceEntity = JSON.parse(fixtures.entityJson);
    this.sourceObject = JSON.parse(fixtures.objectJson);
  });

  it("can transform a single entity", function() {
    destination = transformers.entityTransformer.transform(this.sourceEntity);

    expect(destination.id).toEqual('2');
    expect(destination.idNumber).toEqual('AG14050601_ao');
    expect(destination.displayName).toEqual('Ryan Lammie');

    expect(destination.relationships.length).toEqual(5);
    expect(destination.relationships[0]).toEqual({
        id:   '1',
        type: 'object',
        label: 'OO 11 (855 Empiricism)',
        relationship: 'artist',
        location: 'Radiant Hall'
    });
  });

  it("can transform a single object", function() {
    destination = transformers.objectTransformer.transform(this.sourceObject);

    expect(destination.id).toEqual('1');
    expect(destination.idNumber).toEqual('WK14050601_ao');
    expect(destination.displayName).toEqual('OO 11 (855 Empiricism)');
    expect(destination.material).toEqual('rubber, arylic, silicone, latex, found objects');
    expect(destination.measurements).toEqual('24 x 30 x 11 in (60 x 76 x 28 cm)');
    expect(destination.workType).toEqual({
        workType: 'mixed media',
        workTypeNotes: null
    });
    expect(destination.culture).toEqual({
        culture: 'American',
        notes: null
    });
    expect(destination.relationships[0]).toEqual({
        id:   '2',
        type: 'entity',
        label: 'Ryan Lammie',
        relationship: 'artist',
        location: 'Pittsburgh'
    });

    expect(destination.representations.length).toEqual(1);
    expect(destination.representations[0]).toEqual({
        id: '1',
        url: "http:\/\/archive.collectivearchivepgh.org\/media\/collectiveaccess\/images\/0\/60116_ca_object_representations_media_1_medium.jpg"
    });
  });
});
