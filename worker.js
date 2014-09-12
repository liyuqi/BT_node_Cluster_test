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

process.on('message', function(id, handle) {
    http.createServer(function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Worker ' + id);
    }).listen(handle);
});