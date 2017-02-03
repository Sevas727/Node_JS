var util = require('util');
var restify = require('restify');

var client = restify.createJsonClient({
	url: 'http://maps.googleapis.com/'
});

client.get('/maps/api/geocode/json?address=Moscow+Red+Square', function(err, req, res, obj) {
	if (err)
		console.error(err);
	else
		console.log(util.inspect(obj, {depth: null}));

	var components = obj.results[0].address_components;
	for (key in components) {
		if (components[key].types == "postal_code")
			return console.log('ZIP CODE: ' + components[key].short_name);
	}
});
