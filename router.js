var dbManager = require('./modules/dbManager');
var INDEXNAME = 'Mappings';

//deleteAllNodes = 'MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r';

module.exports = function(app) {
	reinitialize(function() {
		//after REINIT 

		dbManager.listConstraints('id', function(err, res) { 
			console.log(res);
		});

	});
}

function reinitialize(callback) { 
	dbManager.deleteIndex(INDEXNAME, function(res) {
		console.log('after deleting : ', res);
		dbManager.insertIndex(INDEXNAME, function(res) {
			console.log('after inserting : ', res);
			dbManager.createConstraint(INDEXNAME, 'id', function(res) {
				console.log('after creating constraint : ', res);
				callback();
			}); 
		});
	});
}

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
