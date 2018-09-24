const db = require('./routes/database.ts');
let authentication = {};


authentication.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(403).send({message: 'Debes iniciar sesión primero'});
};

module.exports = authentication;

