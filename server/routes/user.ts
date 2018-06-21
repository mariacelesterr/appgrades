const express = require('express');
const router = express.Router();

const passport = require('passport');
const authentication = require('../authentication.ts');

router.post('/login', (req, res, next) => {
	passport.authenticate('local-login', (err, user, info) => {
		if (err) {
			return res.status(401).send({message: err.message});
		}
		if (!user) {
			return res.status(401).send({message: info.message});
		}
		req.logIn(user, (err) => {
			if (err) {
				return res.status(401).send({message: err.message});
			}

			let milliseconds = 0;
			if (req.body.remember) {
				milliseconds = 1000 * 60 * 30; // 30 minutes

				req.session.cookie.expires = new Date(Date.now() + milliseconds);
				req.session.cookie.maxAge = milliseconds;
			} else {
				milliseconds = 1000 * 60 * 60 * 24; // 1 day

				req.session.cookie.expires = new Date(Date.now() + milliseconds);
				req.session.cookie.maxAge = milliseconds;
			}
			return res.status(200).json(req.user);
		});
	})(req, res, next);
});

router.post('/signup', (req, res, next) => {
		passport.authenticate('local-signup', (err, user, info) => {
			if (err) {
				return res.status(403).send({'message': err.message});
			}

			if (!user) {
				return res.status(403).send({'message': info.message});
			}

			return res.status(200).send({'message': 'OK'});
		})(req, res, next);
	}
);

router.get('/profile', authentication.isLoggedIn, (req, res) => {
	res.json(req.user);
});

router.get('/logout', (req) => {
	req.session.destroy((err) => {
		console.error(err);
	});
	req.logout();
});

module.exports = router;
