var neo4j = require('node-neo4j');
var db = new neo4j('http://localhost:7474');
var INDEXNAME = 'Mappings';

exports.executeCypherQuery = function (query, callback) {
	db.cypherQuery(query, function(err, res) {
		if (err)
			callback(err);
		callback(res);
	});
};

exports.deleteIndex = function(indexName, callback) {
	db.deleteNodeIndex(indexName, function(err, res) { 
	    if (err)
	    	callback(err);
	    callback(res);
	});
};

exports.insertIndex = function(indexName, callback) {
	db.insertNodeIndex(indexName, function(err, res) { 
	    if (err) 
	    	callback(err);
	    callback(res);
	});
};

exports.listAllIndexes = function(callback) {
	db.listNodeIndexes(function(err, res) {
		if (err) 
			callback(err);
		callback(res);
	});
};

exports.createConstraint = function(indexName, propertyConstraint, callback) {
	db.createUniquenessContstraint(indexName, propertyConstraint, function(err, res) {
		if (err) 
			callback(err);
		callback(res);
	});
};

exports.listConstraints = function(propertyConstraint, callback) {
	db.listAllConstraints(function(err, res) {
		if (err)
			callback(err);
		callback(err, res);
	});
};

exports.createMapping = function(indexName, idNode, callback) {
	db.insertNode(indexName, 'id', idNode, function(err, res){
	    if (err) 
	    	callback(err);
	    callback(res);
	});
};