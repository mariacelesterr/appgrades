const express = require('express');
const router = express.Router();

const db = require('./database.ts');
const authentication = require('../authentication.ts');

router.post('/app-docentes-agregar',  (req, res) => {
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('SELECT * FROM docentes WHERE cedula = ?', [req.body.cedula], (err, rows) => {
				if (err) {
					res.status(500).send({message: err});
				} 
				console.log(rows);
				if (rows.length){
					res.status(500).send({message: "Docente ya existe"});
				}
				else{
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
		}
	});
});
router.get('/app-docentes',  (req, res) => {

	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('SELECT * FROM docentes', (err, result) => {
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
router.get('/app-detalles-docentes/:id', (req, res) => {
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('SELECT * FROM docentes WHERE id_docentes = ?', [req.params.id], (err, result) => {
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
router.put('/app-detalles-docentes/:id', (req, res) => {
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('UPDATE docentes SET ? WHERE id_docentes = ?', [req.body, req.params.id], (err) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					res.status(200).send({id_docentes: req.params.id});
				}
			});
		}
	});
});
router.delete('/app-detalles-docentes/:id', (req, res) => {
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('DELETE FROM docentes WHERE id_docentes = ?', [req.params.id], (err, result) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					res.status(200).send({id_docentes: req.params.id});
				}
			});
		}
	});
});
module.exports =  router;