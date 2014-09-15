/*
var http = require('http');
process.on('message', function(id, handle, mongodb) {
    http.createServer(function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
		console.log('Worker ' + id);
        res.end('Worker ' + id);
		
		var msg={"worker":id};
		var collection = mongodb.get('events');
		collection.insert(msg,{safe: true}, function(err, events){	if(err)	console.log('insert fail');	res.end();  });

    }).listen(handle);
});*/

var http = require('http');
var util = require('util');
var fs = require('fs');

var monk = require('monk');
var db = monk('127.0.0.1:27017/test');
var collection = db.get('clusterLog');

process.on('message', function(id, handle) {
    http.createServer(function(req, res) {
		/*
		var clusterLog = "\n worker "+id;
		fs.appendFile('./clusterLog.txt', clusterLog, function (err) {
			if(err) console.log("cluster fail");
		});
		*/
		
		collection.insert({"worker":id}, function(err, clusterLog){if(err);});
		
		//db.clusterLog.aggregate({$group:{_id:{ worker:'$worker'}, count:{$sum:1}}})
		
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Worker ' + id);
    }).listen(handle);
});
