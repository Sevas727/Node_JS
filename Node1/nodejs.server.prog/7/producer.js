var util = require('util');
var restify = require('restify');

rest = restify.createServer({
	name: 'ProgSchool'
});

rest.use(restify.authorizationParser());
rest.use(restify.queryParser());
rest.use(restify.bodyParser());
rest.use(restify.gzipResponse());

/* vvv ALWAYS ACCEPTS CORS!!! vvv */
rest.use(function(req, res, next) {
	if (req.headers.origin)
		res.header('Access-Control-Allow-Origin', req.headers.origin);
	
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Cookie, Set-Cookie, Accept, Access-Control-Allow-Credentials, Origin, Content-Type, Request-Id , X-Api-Version, X-Request-Id');
	res.header('Access-Control-Expose-Headers', 'Set-Cookie');

	return next();
});

rest.opts('.*', function(req, res, next) {
	if (req.headers.origin && req.headers['access-control-request-method']) {
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		res.header('Access-Control-Allow-Credentials', 'true');
		res.header('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Cookie, Set-Cookie, Accept, Access-Control-Allow-Credentials, Origin, Content-Type, Request-Id , X-Api-Version, X-Request-Id');
		res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
		res.send(204);
	} else {
		res.send(404);	
	}

	return next();
});
/* ^^^ ALWAYS ACCEPT CORS!!! ^^^ */

rest.use(function(req, res, next) {
	if (req.path().indexOf('/protected') != -1) {
        var auth = req.authorization;

        if (auth.scheme == null) {
			res.header('WWW-Authenticate', 'Basic realm="Please login"');
			return res.send(401);
        } 

        console.log('login: ' + auth.basic.username);
        console.log('password: ' + auth.basic.password);

    	return next();
	}

	return next();
});

rest.get('/', function(req, res) {

	res.send(200, {result: "OK"});
});

rest.get('/redirect', function(req, res) {
	res.setHeader('Location', 'http://google.ru');
	res.send(301);
});

rest.get('/protected/export/:format', function(req, res) {
	res.send(200, {result: req.params.format});
});

rest.post('/protected/import', function(req, res) {
	res.send(200, {result: "imported!", data: req.params});
});

rest.listen(8080, function() {
	console.log('API launched');
});
