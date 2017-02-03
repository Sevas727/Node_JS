var mysql = require('mysql');

var connection = mysql.createConnection({
	host     	: 'localhost',
	database	: 'todo', 
	user     	: 'root',
	password : 'mysql'
});

connection.connect();

var Tasks = {
	list: function(callback) {
		connection.query('SELECT * FROM tasks', callback);
	},

	add: function(task, callback) {
		connection.query('INSERT INTO tasks SET ?', {task: task}, callback);
	},
	
	change: function(id, text, callback) {
		// TODO
	},

	complete: function(id, callback) {
		// TODO
	},

	delete: function(id, callback) {
		// TODO
	}
};

module.exports = Tasks;