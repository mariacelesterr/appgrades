const schema = (db) => {

	let sql_area = 'CREATE TABLE IF NOT EXISTS `area` (' +
		  '`id_area` int(11) NOT NULL AUTO_INCREMENT,' +
		  '`descrp_are` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  'PRIMARY KEY(`id_area`)' +
		') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;';

	let sql_asignatura = 'CREATE TABLE  IF NOT EXISTS `asignatura` (' +
		  '`id_asignatura` int(11) NOT NULL AUTO_INCREMENT,' +
		  '`id_docente` int(11) NOT NULL,' +
		  '`id_area` int(11) NOT NULL,' +
		  '`descrip_asig` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL,' +
		  'PRIMARY KEY(`id_asignatura`),' +
		  'CONSTRAINT `asignatura_ibfk_1` FOREIGN KEY (`id_docente`) REFERENCES `docentes` (`id_docentes`),' +
 		  'CONSTRAINT `asignatura_ibfk_2` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`)' +
		') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;';

	let sql_docentes = 'CREATE TABLE IF NOT EXISTS `docentes` ('+
		  '`id_docentes` int(11) NOT NULL AUTO_INCREMENT,' +
		  '`cedula` int(10) NOT NULL,' +
		  '`nombres` varchar(80) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  '`apellidos` varchar(80) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  '`direccion` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  '`telefono` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  '`correo` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  '`dateofbirth` date DEFAULT NULL,' +
		  '`id_user` int(11) NOT NULL,' +
		  'PRIMARY KEY(`id_docentes`)' +
		') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;';

	let sql_estudiantes = 'CREATE TABLE IF NOT EXISTS `estudiantes` (' +
		  '`id_estudiantes` int(11) NOT NULL AUTO_INCREMENT,' +
		  '`nombres` varchar(80) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  '`apellidos` varchar(80) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  '`direccion` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  '`telefono` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  '`celular` varchar(15) COLLATE utf8mb4_spanish_ci NOT NULL,' +
		  '`correo` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  '`dateofbirth` date DEFAULT NULL,' +
		  '`id_grados` int(11) NOT NULL,' +
		  '`id_seccion` int(11) NOT NULL,' +
		  '`id_periodo` int(10) NOT NULL,' +
		  '`cedula` int(11) NOT NULL,' +
		  'PRIMARY KEY(`id_estudiantes`),' +
		  'CONSTRAINT `estudiantes_ibfk_1` FOREIGN KEY (`id_grados`) REFERENCES `grados` (`id_grados`),'+
  		  'CONSTRAINT `estudiantes_ibfk_2` FOREIGN KEY (`id_seccion`) REFERENCES `seccion` (`id_seccion`),'+
  		  'CONSTRAINT `id_periodo` FOREIGN KEY (`id_periodo`) REFERENCES `periodo` (`id_periodo`) ON DELETE CASCADE'+
		') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;';

	let sql_grados = 'CREATE TABLE IF NOT EXISTS `grados` (' +
		  '`id_grados` int(11) NOT NULL AUTO_INCREMENT,' +
		  '`descrip_gra` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  'PRIMARY KEY(`id_grados`)' +
		') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;';

	let sql_lapso = 'CREATE TABLE IF NOT EXISTS `lapso` (' +
		  '`id_lapso` int(11) NOT NULL AUTO_INCREMENT,' +
		  '`descrip` char(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  'PRIMARY KEY(`id_lapso`)' +
		') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;';

	let sql_nota_cuali = 'CREATE TABLE IF NOT EXISTS `notas_cuali` (' +
		  '`id_notas_cuali` int(11) NOT NULL AUTO_INCREMENT,' +
		  '`id_estudiantes` int(11) NOT NULL,' +
		  '`id_grados` int(11) NOT NULL,' +
		  '`id_periodo` int(11) NOT NULL,' +
		  '`id_asignatura` int(11) NOT NULL,' +
		  '`nota_def` double DEFAULT NULL,' +
		  '`descrip` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  'PRIMARY KEY(`id_notas_cuali`),' +
		  'CONSTRAINT `notas_cuali_ibfk_1` FOREIGN KEY (`id_estudiantes`) REFERENCES `estudiantes` (`id_estudiantes`),' +
		  'CONSTRAINT `notas_cuali_ibfk_2` FOREIGN KEY (`id_grados`) REFERENCES `grados` (`id_grados`),' +
		  'CONSTRAINT `notas_cuali_ibfk_3` FOREIGN KEY (`id_periodo`) REFERENCES `periodo` (`id_periodo`),' +
		  'CONSTRAINT `notas_cuali_ibfk_4` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`)' +
		') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;';

	let sql_notas_descrip = 'CREATE TABLE IF NOT EXISTS `notas_descrip` (' +
		  '`id_notas_descrip` int(11) NOT NULL AUTO_INCREMENT,' +
		  '`id_estudiantes` int(11) NOT NULL,' +
		  '`id_lapso` int(10) NOT NULL,' +
		  '`proyecto` text COLLATE utf8mb4_spanish_ci,' +
		  '`tipo_bole` int(11) NOT NULL,' +
		  '`descrip_1` text COLLATE utf8mb4_spanish_ci,' +
		  '`descrip_2` varchar(1199) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  '`descrip_3` varchar(500) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  '`nota_final` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  '`nota_cuali` int(10) NOT NULL,' +
		  'PRIMARY KEY(`id_notas_descrip`),' +
		  'CONSTRAINT `notas_descrip_ibfk_1` FOREIGN KEY (`id_estudiantes`) REFERENCES `estudiantes` (`id_estudiantes`),' +
		  'CONSTRAINT `notas_descrip_ibfk_7` FOREIGN KEY (`id_lapso`) REFERENCES `lapso` (`id_lapso`)' +
		') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;';

	let sql_notas_num = 'CREATE TABLE IF NOT EXISTS `notas_num` (' +
		  '`id_notas_num` int(11) NOT NULL AUTO_INCREMENT,' +
		  '`id_estudiantes` int(11) NOT NULL,' +
		  '`id_grados` int(11) NOT NULL,' +
		  '`id_periodo` int(11) NOT NULL,' +
		  '`id_asignatura` int(11) NOT NULL,' +
		  '`nota_def` double DEFAULT NULL,' +
		  '`descrip` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  '`nota1` int(11) DEFAULT NULL,' +
		  '`nata2` int(11) DEFAULT NULL,' +
		  '`nota3` int(11) DEFAULT NULL,' +
		  '`nota4` int(11) DEFAULT NULL,' +
		  'PRIMARY KEY(`id_notas_num`),' +
		  'CONSTRAINT `notas_num_ibfk_1` FOREIGN KEY (`id_estudiantes`) REFERENCES `estudiantes` (`id_estudiantes`),'+
		  'CONSTRAINT `notas_num_ibfk_2` FOREIGN KEY (`id_grados`) REFERENCES `grados` (`id_grados`),'+
		  'CONSTRAINT `notas_num_ibfk_3` FOREIGN KEY (`id_periodo`) REFERENCES `periodo` (`id_periodo`),'+
		  'CONSTRAINT `notas_num_ibfk_7` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`)'+
		') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;';

	let sql_periodo = 'CREATE TABLE IF NOT EXISTS `periodo` (' +
		  '`id_periodo` int(11) NOT NULL AUTO_INCREMENT,' +
		  '`descrip_peri` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  'PRIMARY KEY(`id_periodo`)' +
		') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;';

	let sql_seccion = 'CREATE TABLE IF NOT EXISTS `seccion` (' +
		  '`id_seccion` int(11) NOT NULL AUTO_INCREMENT,' +
		  '`descrp_sec` varchar(45) COLLATE utf8mb4_spanish_ci DEFAULT NULL,' +
		  'PRIMARY KEY(`id_seccion`)' +
		') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;';

	let sql_users = 'CREATE TABLE IF NOT EXISTS `users` (' +
		  '`id` int(11) NOT NULL AUTO_INCREMENT,' +
		  '`username` varchar(255) NOT NULL,' +
		  '`password` varchar(255) NOT NULL,' +
		  'PRIMARY KEY(`id`)' +
		') ENGINE=InnoDB DEFAULT CHARSET=utf8;';
 

	db.getConnection((err, connection) => {
		if (err) {
			console.log(err);
		} else {
			connection.query(sql_area, (err) => {
				if (err) {
					console.log(err);
				}
			});
			connection.query(sql_asignatura, (err) => {
				if (err) {
					console.log(err);
				}
			});
			connection.query(sql_docentes, (err) => {
				if (err) {
					console.log(err);
				}
			});
			connection.query(sql_estudiantes, (err) => {
				if (err) {
					console.log(err);
				}
			});
			connection.query(sql_grados, (err) => {
				if (err) {
					console.log(err);
				}
			});
			connection.query(sql_lapso, (err) => {
				if (err) {
					console.log(err);
				}
			});
			connection.query(sql_nota_cuali, (err) => {
				if (err) {
					console.log(err);
				}
			});
			connection.query(sql_notas_descrip, (err) => {
				if (err) {
					console.log(err);
				}
			});
			connection.query(sql_notas_num, (err) => {
				if (err) {
					console.log(err);
				}
			});
			connection.query(sql_periodo, (err) => {
				if (err) {
					console.log(err);
				}
			});
			connection.query(sql_seccion, (err) => {
				if (err) {
					console.log(err);
				}
			});
			connection.query(sql_users, (err) => {
				if (err) {
					console.log(err);
				}
			});

			connection.release();
		}
	});
};

module.exports = schema;
