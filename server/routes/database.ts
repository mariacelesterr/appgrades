const express = require('express');
const router = express.Router();
var mysql = require('mysql');

const db = (() => {
	this.pool = mysql.createPool({
		connectionLimit: 12,
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'dbapp-grades',
		charset: 'utf8',
		socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
		port: 3306
	});

	this.getConnection = (cb) => {
		this.pool.getConnection(cb);
	};
	this.query = (sql, values) => new Promise((resolve, reject) => {
		this.pool.getConnection((err, connection) => {
			if (err) {
				console.log(err);
			} else {
				connection.query(sql, values, (err, results) => {
					connection.release();

					if (err) {
						console.log(err);
					} else {
						resolve(results);
					}
				});
			}
		});
	});
	return this;
})();

module.exports = db;