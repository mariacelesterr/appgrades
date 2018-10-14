const express = require('express');
const router = express.Router();

const db = require('./database.ts');
const authentication = require('../authentication.ts');

//SELECT id_alumno, AVG(valor_nota) FROM tabla GROUP BY id_alumno;
router.post('/app-estadisticas', (req, res) => {
	db.getConnection((err, connection) => {
		if (err) {
			res.status(500).send({message: err});
		} else {
			connection.query('SELECT *, count(notas_descrip.id_estudiantes) AS cantidad, AVG(nota_cuali) AS promedio FROM notas_descrip INNER JOIN estudiantes ON  notas_descrip.id_estudiantes = estudiantes.id_estudiantes INNER JOIN lapso ON notas_descrip.id_lapso = lapso.id_lapso WHERE estudiantes.id_grados = ? AND estudiantes.id_seccion = ? AND estudiantes.id_periodo = ? GROUP BY notas_descrip.id_lapso', [req.body.id_grado, req.body.id_seccion, req.body.id_periodo], (err, results) => {
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

module.exports =  router;