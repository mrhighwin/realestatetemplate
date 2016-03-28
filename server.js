var express = require('express');
var app = express();
var routes = require('./server/routes');
var PORT = process.env.PORT || 3000;

routes(app);

app.all('/*', function(req, res) {
    res.send('<!DOCTYPE html>\
			<html lang="en">\
			<head>\
			<meta charset="UTF-8">\
			<title>Mean Stack Todo List</title>\
			<base href="/">\
			</head>\
			<body>\
			<div ui-view></div>\
			<script src="bundle.js"></script>\
			</body>\
			</html>');
});

app.listen(PORT, function() {
    console.log('Server is running on ' + PORT + ' now Bro');
});
