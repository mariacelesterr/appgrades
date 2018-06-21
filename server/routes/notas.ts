const express = require('express');
const router = express.Router();

const db = require('./database.ts');
const authentication = require('../authentication.ts');

router.post('/app-notas',  (req, res) => {

	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('SELECT * FROM estudiantes WHERE id_grados = ? AND id_seccion = ?', [req.body.id_grados, req.body.id_seccion], (err, result) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					res.status(200).send(result);
				}
			});
		}
	});
});
router.post('/app-notas/app-boletin-descrip/:id',  (req, res) => {
	console.log(req.body);

	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('INSERT INTO notas_descrip SET ?', req.body, (err, result) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					res.status(200).send({id_notas_descrip: result.insertId});
				}
			});
		}
	});
});

router.get('/app-notas/app-boletin-descrip/:id',(req, res )=>{
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('SELECT * FROM estudiantes WHERE id_estudiantes = ?', [req.params.id], (err, result) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					res.status(200).send(result);
				}
			});
		}
	});
});

module.exports =  router;