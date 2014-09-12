/*
var child_process = require('child_process');
var net = require('net');
var tcpSrv = net.createServer();

var settings = require('./settings');
var monk = require('monk');
var dbevents = monk('127.0.0.1:27017/test');

tcpSrv.listen(80, function() {
    for (var i = 1; i <= 4; i++) {
        var worker = child_process.fork('worker.js');
        worker.send(i, tcpSrv._handle, dbevents);
    }
    tcpSrv.close();
});
*/

var child_process = require('child_process');
var net = require('net');

var tcpSrv = net.createServer();
tcpSrv.listen(8080, function() {
    for (var i = 1; i <= 4; i++) {
        var worker = child_process.fork('worker.js');
        worker.send(i, tcpSrv._handle);
    }

    tcpSrv.close();
});