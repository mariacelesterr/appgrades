const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const http = require('http');
const app = express();
const expressSanitizer = require('express-sanitizer');

// Routes
const database = require('./server/routes/database.ts');
require('./server/passport.ts')(passport);
const userRoutes = require('./server/routes/user.ts');
const estudiantesRoutes = require('./server/routes/estudiantes.ts');
const docentesRoutes = require('./server/routes/docentes.ts');
const notasRoutes = require('./server/routes/notas.ts');
const estadisticasRoutes = require('./server/routes/estadisticas.ts');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use(expressSanitizer());

app.use(session({
	secret: 'mySecretKey',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Initial routes
app.use('/api', userRoutes);
app.use('/api', estudiantesRoutes);
app.use('/api', docentesRoutes);
app.use('/api', notasRoutes);
app.use('/api', estadisticasRoutes);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Corriendo en puerto:${port}`));