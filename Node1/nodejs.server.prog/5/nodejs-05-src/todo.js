var tasks = require('./models/tasks');

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser());

var templates = require('consolidate');
app.engine('hbs', templates.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

var request = require('request');
var urlutils = require('url');

app.get('/', function(req, res) {
	tasks.list(function(err, tasks) {
		console.dir(tasks);

		res.render(
			'tasks.hbs', 
			{tasks: tasks},
			function(err, html) {
				if (err) 
					throw err;

				console.log(html);

				res.render('layout.hbs', {
					content: html
				});
			}
		)
	});
});

app.post('/', function(req, res) {
	tasks.add(req.body.task, function() {
		res.redirect('/');
	});
});

app.listen(3333);
console.log('Express server listening on port 3333');