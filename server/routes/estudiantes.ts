
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
router.get('/app-buscar-estudiantes', (req, res) => {
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('SELECT * FROM estudiantes INNER JOIN grados ON estudiantes.id_grados= grados.id_grados INNER JOIN seccion ON estudiantes.id_seccion=seccion.id_seccion', (err, result) => {
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
router.get('/app-detalles-estudiantes/:id', (req, res) => {
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('SELECT * FROM estudiantes WHERE id_estudiantes = ?', [req.params.id], (err, result) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					res.status(200).send(result[0]);
				}
			});
		}
	});
});

router.put('/app-detalles-estudiantes/:id', (req, res) => {
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('UPDATE estudiantes SET ? WHERE id_estudiantes = ?', [req.body, req.params.id], (err) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					res.status(200).send({id_estudiantes: req.params.id});
				}
			});
		}
	});
});
router.delete('/app-detalles-estudiantes/:id', (req, res) => {
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('DELETE FROM estudiantes WHERE id_estudiantes = ?', [req.params.id], (err, result) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					res.status(200).send({id_estudiantes: req.params.id});
				}
			});
		}
	});
});


module.exports = router;