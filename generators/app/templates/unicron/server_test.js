var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;
var webPath = '/';

app.use(express.static(__dirname + webPath + '/build'));
app.use('/build', express.static(__dirname + webPath + '/build'));
app.use('/bower_components', express.static(__dirname + webPath + '/bower_components'));
app.use('/node_modules', express.static(__dirname + webPath + '/node_modules'));
app.use('/.tmp', express.static(__dirname + webPath + '/.tmp'));
app.use('/specs', express.static(__dirname + webPath + '/src/specs'));
app.use('/src/specs', express.static(__dirname + webPath + '/src/specs'));
app.listen(port, function() {
	console.log('Express server listening on port ' + port);
});
