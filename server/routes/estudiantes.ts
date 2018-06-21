const express = require('express');
const router = express.Router();
const db = require('./database.ts');
const authentication = require('../authentication.ts');

router.post('/app-estudiantes', (req, res) => {

	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('INSERT INTO estudiantes SET ?', req.body, (err, result) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					res.status(200).send({id_estudiantes: result.insertId});
				}
			});
		}
	});
});


module.exports = router;