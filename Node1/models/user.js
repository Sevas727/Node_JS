import Sequelize from "sequelize";
import sequelize from '../config/db';

var User = sequelize.define('user', {

	id: {
		type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
	},
	name: {
		type:
			Sequelize.STRING,
			validate: {
			len: {
				args: 3,
					msg: "Name must be atleast 3 characters in length"
			}
		}
	},
	email: {
		type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			validate: {
			len: {
				args: [6, 128],
					msg: "Email address must be between 6 and 128 characters in length"
			},
			isEmail: {
				msg: "Email address must be valid"
			}
		}
	},
	password: {
		type: Sequelize.STRING,
			allowNull: false,
			validate: {
			len: {
				args: [6, 25],
				msg: "Password must be between 6 and 25 characters in length"
			}
		}
	}
}, {
	freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function () {
	// Table created
	return User.create({
		name: 'John',
		password: 'Hancock',
		email: 'test@gmail.com'
	});
});

module.exports = User;

/*
var Tasks = {

	findOne: function(callback) {
		connection.query('SELECT * FROM user', callback);
	},

	list: function(callback) {
		connection.query('SELECT * FROM user', callback);
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
*/
