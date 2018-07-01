const express = require('express');
const router = express.Router();

const db = require('./database.ts');
const authentication = require('../authentication.ts');
var g = 2;
var s = 3;
var p = 1;
//SELECT id_alumno, AVG(valor_nota) FROM tabla GROUP BY id_alumno;
router.post('/app-estadisticas', (req, res) => {
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('SELECT AVG(nota_cuali) AS promedio FROM notas_descrip WHERE id_grado = ? AND id_seccion = ? AND id_periodo = ? GROUP BY id_lapso', [req.body.id_grado, req.body.id_seccion, req.body.id_periodo], (err, results) => {
				connection.release();

				if (err) {
					res.status(500).send({message: err});
				} else {
					res.send(results);
				}
			});
		}
	});
});
router.get('/app-estadisticas',(req, res )=>{
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


module.exports =  router;