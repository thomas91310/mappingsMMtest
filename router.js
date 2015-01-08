var dbManager = require('./modules/dbManager');
var INDEXNAME = 'Mappings';

deleteAllNodes = 'MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r';

var idNode = 'mm:9101112';

module.exports = function(app) {
	// reinitialize(function() {
	// 	//after REINIT
	// 	console.log("REINITIALIZATION");
	// 	// dbManager.insertNode(INDEXNAME, idNode, function(res) {
	// 	// 	console.log('res : ', res);
	// 	// });
	// });

	app.get('/mapping/:id', function(req, res) {
		var nodes = req.params.id.split(',');
		var firstNode = nodes[0];
		var secondNode = nodes[1];
		createOrFindExistingNode(firstNode, function(firstMapping) {

			createOrFindExistingNode(secondNode, function(secondMapping) {

				var query = "MATCH (n1:Mappings {id: '" + firstMapping.id + "' }), (n2:Mappings {id: '" + secondMapping.id + "' }) CREATE (n1)-[:HAS_MAPPING]->(n2)";
				//query to create the relationship between the 2 nodes.

				dbManager.executeCypherQuery(query, function(res) {
					console.log('res : ', res);
				});

			});

		});

	 });

};

var createOrFindExistingNode = function(nodeID, callback) {
	dbManager.insertNode(INDEXNAME, nodeID, function(res) {
		callback(res);
	});
}

function reinitialize(callback) { 
	dbManager.executeCypherQuery(deleteAllNodes, function(res) { //this deletes everything !! Be careful
		console.log('after deleting all nodes : ', res);
		dbManager.deleteIndex(INDEXNAME, function(res) {
			console.log('after deleting : ', res);
			dbManager.insertIndex(INDEXNAME, function(res) {
				console.log('after inserting : ', res);
				dbManager.createConstraint(INDEXNAME, 'id', function(res) {
					dbManager.listConstraints('id', function(res) { 
						console.log('after creating constraint : ', res);
						callback();
					});
				}); 
			});
		});
	});
}


//HOW TO RETRIEVE ALL MAPPINGS FROM A NODE:
	// MATCH (mapping:Mappings {id: 'mm:131415' })-[r]->(HAS_MAPPING) RETURN *

//HOW TO CREATE MAPPINGS W RELATIONS !
//SITUATION 1:
	//CREATE (n1: Mappings { id: 'mm:131415' })
	//CREATE (n2: Mappings { id: 'mm:151617' })
	//CREATE(n3: Mappings { id: 'mm:171819' })
	//CREATE
		//(n1)-[:HAS_MAPPING]->(n2),
		//(n1)-[:HAS_MAPPING]->(n3)

//SITUATION 2: 
// CREATE (n5: Mappings { id: 'mm:442843' })
// CREATE (n6: Mappings { id: 'mm:349572' })
// CREATE(n7: Mappings { id: 'mm:543684' })
// CREATE(n8: Mappings { id: 'mm:301193' })
// 	CREATE
// 		(n5)-[:HAS_MAPPING]->(n6),
// 		(n5)-[:HAS_MAPPING]->(n7),
// 		(n6)-[:HAS_MAPPING]->(n7),
// 		(n6)-[:HAS_MAPPING]->(n8),
// 		(n8)-[:HAS_MAPPING]->(n7),
// 		(n8)-[:HAS_MAPPING]->(n5)

// dbManager.findNodeByMappingId(req.params.id, function(res) {
// 	if (res.length !== 0) {
// 		console.log('mapping ' + req.params.id + ' after call: ', res);
// 		//CYPHER QUERY FOR RETURNING OBJECT IN NEO4j
// 		// MATCH (mapping:Mappings { id: 'mm:9101112' }) RETURN mapping
// 	} else {
// 		console.log('mapping ' + req.params.id + ' doesnt exist : ', res);
// 		//RETURN EMPTY OBJECT
// 	}
// });

// dbManager.insertNode(INDEXNAME, firstNode, function(res) {
// 	console.log('here res : ', res);

// 		//CYPHER QUERY FOR RETURNING OBJECT IN NEO4j

// 		//MATCH (mapping:Mappings { id: 'mm:9101112' }) RETURN mapping
// });


//node insertion

// var node = db.createNode({mapping: 'mm:100000'});     // instantaneous, but...
// node.save(function (err, node) {    // ...this is what actually persists.
//     if (err) {
//         console.error('Error saving new node to database:', err);
//     } else {
//         console.log('Node saved to database with id:', node.id);
//     }
// });

// db.cypherQuery("CREATE (first: Mapping { id: 'mm:123456' })", function(err, result) {

//     if(err) throw err;

//     console.log('res creating : ', result); // delivers an array of query results
// });

// db.cypherQuery("MATCH (first:Mapping) WHERE first.id = 'mm:123456' RETURN first;", function(err, result) {

// 	if (err) throw err;

//     console.log('res matching mm:123456 :', result);
// });
