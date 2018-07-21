const passport = require('passport');

let LocalStrategy = require('passport-local').Strategy;

let bcrypt = require('bcrypt-nodejs');
let db = require('./routes/database.ts');

module.exports = (passport) => {
	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser((id, done) => {
		db.getConnection((err, connection) => {
			if (err) {
				console.error('error', err);
				return done(err);
			} else {
				connection.query('SELECT * FROM users WHERE id = ?', [id], (err, rows) => {
					connection.release();

					if (err) {
						console.error('error', err);
						return done(err);
					} else {
						done(null, rows[0]);
					}
				});
			}
		});
	});

	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-signup',
		new LocalStrategy({
				// by default, local strategy uses username and password, we will override with email
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true // allows us to pass back the entire request to the callback
			},
			(req, username, password, done) => {
				console.log('---- User Signup: ' + username + ' ----');

				db.getConnection((err, connection) => {
					if (err) {
						console.error('error', err);
						return done(err);
					} else {
						connection.query('SELECT * FROM users WHERE username = ?', [username], (err, rows) => {
							if (err) {
								console.error('error', err);
								return done(err);
							}

							if (rows.length) {
								return done(err, false, {message: 'El email ya existe'});
							} else {
								// if there is no user with that username, create the user
								let newUserMysql = {
									username: username,
									password: bcrypt.hashSync(password, null, null) // use the generateHash function in our user model
								};

								let insertQuery = 'INSERT INTO users ( username, password ) values (?,?)';

								connection.query(insertQuery, [newUserMysql.username, newUserMysql.password], (err, rows) => {
									connection.release();
									if (err) {
										console.error('error', err);
										return done(err);
									}

									newUserMysql = rows;

									return done(null, newUserMysql);
								});
							}
						});
					}
				});
			})
	);

	// =========================================================================
	// LOCAL LOGIN =============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-login',
		new LocalStrategy({
				// by default, local strategy uses username and password, we will override with email
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true // allows us to pass back the entire request to the callback
			},
			(req, username, password, done) => { // callback with email and password from our form
				console.log('---- User login: ' + username + ' ----');

				db.getConnection((err, connection) => {
					if (err) {
						console.error('error', err);
						return done(err);
					} else {
						connection.query('SELECT * FROM users WHERE username = ?', [username], (err, rows) => {
							connection.release();

							if (err) {
								console.error('error', err);
								return done(err);
							}

							if (rows.length) {
								// if the user is found but the password is wrong
								if (!bcrypt.compareSync(password, rows[0].password)) {
									return done(err, false, {message: 'La contraseña es incorrecta'});
								} else {
									// all is well, return successful user
									return done(null, rows[0]);
								}
							} else {
								return done(err, false, {message: 'El usuario no esta registrado'});
							}
						});
					}
				});
			})
	);
};
