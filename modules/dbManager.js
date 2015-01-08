var neo4j = require('node-neo4j');
var db = new neo4j('http://localhost:7474');
var INDEXNAME = 'Mappings';

exports.executeCypherQuery = function (query, callback) {
	db.cypherQuery(query, function (err, res) {
		if (err)
			callback(err);
		callback(res);
	});
};

exports.deleteIndex = function (indexName, callback) {
	db.deleteNodeIndex(indexName, function (err, res) { 
	    if (err)
	    	callback(err);
	    callback(res);
	});
};

exports.insertIndex = function (indexName, callback) {
	db.insertNodeIndex(indexName, function (err, res) { 
	    if (err) 
	    	callback(err);
	    callback(res);
	});
};

exports.listAllIndexes = function (callback) {
	db.listNodeIndexes(function (err, res) {
		if (err) 
			callback(err);
		callback(res);
	});
};

exports.createConstraint = function (indexName, propertyConstraint, callback) {
	db.createUniquenessContstraint(indexName, propertyConstraint, function (err, res) {
		if (err) 
			callback(err);
		callback(res);
	});
};

exports.listConstraints = function (propertyConstraint, callback) {
	db.listAllConstraints(function (err, res) {
		if (err)
			callback(err);
		callback(res);
	});
};

exports.insertNode = function(indexName, idNode, callback) {
	db.insertNode({
		id: idNode
	}, [indexName], function (err, res) { 
		if (err) {
			findNodeByMappingId(idNode, function(status, foundNode) { //else return found item
				if (status !== null)
					callback(foundNode);
				else
					callback(err); //callback initial error 400
			});
		} else 
			callback(res);
	});
}

exports.createRelationship = function(root_node_id, other_node_id, relation_type, callback) {
	db.insertRelationship(root_node_id, other_node_id, relation_type, {}, function (err, relationship) {
        if(err) 
        	callback(null, err);
        
        callback('ok', relationship);
    });
};

var findNodeByMappingId = function(idNode, callback) {
	db.readNodesWithLabelsAndProperties('Mappings', {
	    id: idNode
	}, function (err, res) {
	    if (err)
	    	callback(null, err);
	    else 
	    	callback('ok', res[0]);
	});
};

