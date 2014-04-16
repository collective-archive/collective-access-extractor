transformers = require('../lib/transformers');
fixtures     = require('./fixtures')

describe("Transformers", function() {
  beforeEach(function() {
    this.sourceEntity = JSON.parse(fixtures.entityJson);
    this.sourceObject = JSON.parse(fixtures.objectJson);
  });

  it("can transform a single entity", function() {
    destination = transformers.entityTransformer.transform(this.sourceEntity);

    expect(destination.id).toEqual('1');
    expect(destination.idNumber).toEqual('AG14031401_ao');
    expect(destination.displayName).toEqual('Allan Sekula');
    expect(destination.addresses[0].address1).toEqual('3816 Clinton Street');
    expect(destination.addresses[0].address2).toEqual(null);
    expect(destination.addresses[0].city).toEqual('Los Angeles');
    expect(destination.addresses[0].stateprovince).toEqual('California');
    expect(destination.addresses[0].postalcode).toEqual('90004');
    expect(destination.addresses[0].country).toEqual('USA');

    expect(destination.relationships[0]).toEqual({
        id:   '3',
        type: 'object',
        label: 'Pipe fitters finishing the engine room of a tuna-fishing boat. Campbell Shipyard. San Diego harbor',
        relationship: 'creator'
    });
  });

  it("can transform a single object", function() {
    destination = transformers.objectTransformer.transform(this.sourceObject);

    expect(destination.id).toEqual('3');
    expect(destination.idNumber).toEqual('WK14031401_ao');
    expect(destination.displayName).toEqual('Pipe fitters finishing the engine room of a tuna-fishing boat. Campbell Shipyard. San Diego harbor');
    expect(destination.material).toEqual('dye transfer print');
    expect(destination.measurements).toEqual({
        height: '61.3 cm',
        width: '77.8 cm'
    });
    expect(destination.relationships[0]).toEqual({
        id:   '1',
        type: 'entity',
        label: 'Allan Sekula',
        relationship: 'creator'
    });
  });
});

