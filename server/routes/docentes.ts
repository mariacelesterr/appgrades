const express = require('express');
const router = express.Router();

const db = require('./database.ts');
const authentication = require('../authentication.ts');

router.post('/app-docentes',  (req, res) => {

	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('INSERT INTO docentes SET ?', req.body, (err, result) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					res.status(200).send({id_docentes: result.insertId});
				}
			});
		}
	});
});

module.exports =  router;