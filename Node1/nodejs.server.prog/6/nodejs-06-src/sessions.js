var express = require('express');
var app = express();

// parses request cookies to req.cookies
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// use req.session as data store
var session = require('cookie-session')

app.use(session({keys: ['secret']}));

app.use(function (req, res, next) {
	var n = req.session.views || 0;
	req.session.views = ++n;
	res.end(n + ' views');
});

app.listen(8080);
console.log('Express started on port %d', 8080);
