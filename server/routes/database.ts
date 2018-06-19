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
	return this;
})();

module.exports = db;