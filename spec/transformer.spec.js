M = require('mstring');
transformers = require('../lib/transformers');

describe("Transformers", function() {
  beforeEach(function() {
    this.entityJson = M(function() {
      /***
{
   "ok":true,
   "preferred_labels":{
      "en_US":[
         "Allan Sekula"
      ]
   },
   "entity_id":{
      "value":"1"
   },
   "type_id":{
      "value":"80",
      "display_text":{
         "en_US":"Personal"
      }
   },
   "idno":{
      "value":"AG14031401_ao"
   },
   "idno_sort":{
      "value":"AG14031401  ao          "
   },
   "lifespan":{
      "value":""
   },
   "hier_entity_id":{
      "value":"1"
   },
   "hier_left":{
      "value":"1.00000000000000000000"
   },
   "hier_right":{
      "value":"4294967296.00000000000000000000"
   },
   "access":{
      "value":"0",
      "display_text":{
         "en_US":"not accessible to public"
      }
   },
   "status":{
      "value":"0",
      "display_text":{
         "en_US":"new"
      }
   },
   "deleted":{
      "value":"0"
   },
   "rank":{
      "value":"0"
   },
   "ca_entities.address":[
      {
         "none":{
            "address1":"3816 Clinton Street",
            "address2":null,
            "city":"Los Angeles",
            "stateprovince":"California",
            "postalcode":"90004",
            "country":"USA"
         }
      }
   ],
   "ca_entities.telephone":[
      {
         "none":{
            "telephone":"(213) 258-8259"
         }
      }
   ],
   "ca_entities.email":[
      {
         "none":{
            "email":"Allan Sekula <allansekula@gmail.com>"
         }
      }
   ],
   "ca_entities.refid":[
      {
         "en_US":{
            "refid":"500085803"
         }
      }
   ],
   "ca_entities.vocab":[
      {
         "en_US":{
            "vocab":"Union List of Artist Names Online (ULAN)"
         }
      }
   ],
   "ca_entities.attribution":[
      {
         "en_US":{
            "attribution":null
         }
      }
   ],
   "ca_entities.culture":[
      {
         "en_US":{
            "culture":"American"
         }
      }
   ],
   "ca_entities.agentDates":[
      {
         "en_US":{
            "agentDisplayDate":"1951-2013",
            "agentIndexingDate":"1951 - 2013",
            "agentDateType":"life"
         }
      }
   ],
   "ca_entities.roleSet":[
      {
         "en_US":{
            "role":"photographer",
            "roleVocab":null,
            "roleRefid":null
         }
      }
   ],
   "related":{
      "ca_objects":[
         {
            "item_type_id":"21",
            "object_id":"3",
            "sdatetime":null,
            "edatetime":null,
            "relationship_type_id":"96",
            "idno":"WK14031401_ao",
            "idno_sort":"WK14031401  ao          ",
            "relation_id":"1",
            "name":"Pipe fitters finishing the engine room of a tuna-fishing boat. Campbell Shipyard. San Diego harbor",
            "locale_id":"1",
            "source_info":"",
            "row_id":"1",
            "labels":{
               "1":"Pipe fitters finishing the engine room of a tuna-fishing boat. Campbell Shipyard. San Diego harbor"
            },
            "_key":"relation_id",
            "direction":"rtol",
            "relationship_typename":"creator",
            "relationship_type_code":"creator",
            "label":"Pipe fitters finishing the engine room of a tuna-fishing boat. Campbell Shipyard. San Diego harbor"
         }
      ]
   }
}
      ***/
    });

    this.sourceEntity = JSON.parse(this.entityJson);
  });

  it("can transform a single item", function() {
    destinationEntity = transformers.entityTransformer.transform(this.sourceEntity);

    expect(destinationEntity.id).toEqual('1');
    expect(destinationEntity.idNumber).toEqual('AG14031401_ao');
    console.log(destinationEntity);
    expect(destinationEntity.addresses[0].address1).toEqual('3816 Clinton Street');
    expect(destinationEntity.addresses[0].address2).toEqual(null);
    expect(destinationEntity.addresses[0].city).toEqual('Los Angeles');
    expect(destinationEntity.addresses[0].stateprovince).toEqual('California');
    expect(destinationEntity.addresses[0].postalcode).toEqual('90004');
    expect(destinationEntity.addresses[0].country).toEqual('USA');
  });
});

