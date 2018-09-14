const express = require('express');
const router = express.Router();

const db = require('./database.ts');
const authentication = require('../authentication.ts');

router.post('/app-notas',  (req, res) => {
	db.getConnection((err, connection) => {
				connection.release();
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('SELECT e.nombres, e.apellidos, e.correo, e.celular, e.id_estudiantes, n.descrip_1, n.descrip_2, n.descrip_3, n.id_lapso, n.id_notas_descrip FROM estudiantes AS e LEFT JOIN notas_descrip AS n ON e.id_estudiantes = n.id_estudiantes WHERE e.id_grados = ? AND e.id_seccion = ? AND e.id_periodo = ? GROUP BY e.id_estudiantes, n.id_lapso', [req.body.id_grados, req.body.id_seccion, req.body.id_periodo], (err, result) => {
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

/*router.get('/app-notas/app-boletin-descrip/:id',(req, res )=>{
	let estudiantes = [],
		periodos = [];
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('SELECT * FROM estudiantes INNER JOIN grados ON estudiantes.id_grados= grados.id_grados INNER JOIN seccion ON estudiantes.id_seccion=seccion.id_seccion INNER JOIN periodo ON estudiantes.id_periodo=periodo.id_periodo WHERE id_estudiantes = ?', [req.params.id], (err, result) => {
				if (err) {
					res.status(500).send({message: err});
				} else {
					estudiantes = result[0];
				}
			});
			connection.query('SELECT * FROM notas_descrip WHERE id_estudiantes = ?', [req.params.id] (err, result) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					periodos = result;
					res.status(200).send({estudiantes: estudiantes, periodos: periodos});
				}
			});
		}
	});
});*/
router.get('/app-pdf/:id',(req, res )=>{
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('SELECT * FROM notas_descrip INNER JOIN grados ON notas_descrip.id_grado= grados.id_grados INNER JOIN seccion ON notas_descrip.id_seccion=seccion.id_seccion INNER JOIN periodo ON notas_descrip.id_periodo=periodo.id_periodo INNER JOIN lapso ON notas_descrip.id_lapso=lapso.id_lapso INNER JOIN estudiantes ON notas_descrip.id_estudiantes=estudiantes.id_estudiantes WHERE id_notas_descrip = ?', [req.params.id], (err, result) => {
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

router.get('/app-notas/app-boletin-descrip/:id',(req, res )=>{
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('SELECT * FROM notas_descrip INNER JOIN grados ON notas_descrip.id_grado= grados.id_grados INNER JOIN seccion ON notas_descrip.id_seccion=seccion.id_seccion INNER JOIN periodo ON notas_descrip.id_periodo=periodo.id_periodo INNER JOIN lapso ON notas_descrip.id_lapso=lapso.id_lapso INNER JOIN estudiantes ON notas_descrip.id_estudiantes=estudiantes.id_estudiantes WHERE id_notas_descrip = ?', [req.params.id], (err, result) => {
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
router.get('/app-notas',(req, res )=>{
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('SELECT * FROM notas_descrip INNER JOIN grados ON notas_descrip.id_grado= grados.id_grados INNER JOIN seccion ON notas_descrip.id_seccion=seccion.id_seccion INNER JOIN periodo ON notas_descrip.id_periodo=periodo.id_periodo INNER JOIN lapso ON notas_descrip.id_lapso=lapso.id_lapso INNER JOIN estudiantes ON notas_descrip.id_estudiantes=estudiantes.id_estudiantes WHERE id_notas_descrip = ?', [req.params.id], (err, result) => {
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

router.post('/app-periodo-agregar', (req, res) => {
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('INSERT INTO periodo SET ?', req.body, (err, result) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					res.status(200).send({result});
				}
			});
		}
	});
});
router.get('/app-periodo', (req, res) => {
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('SELECT * FROM periodo', (err, result) => {
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
router.delete('/app-notas/:id', (req, res) => {
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('DELETE FROM notas_descrip WHERE id_notas_descrip = ?', [req.params.id], (err, result) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					res.status(200).send({id_notas_descrip: req.params.id});
				}
			});
		}
	});
});

module.exports =  router;