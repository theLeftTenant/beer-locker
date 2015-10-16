var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../models/user');
var Client = require('../models/client');
var Token = require('../models/token');

passport.use(new BasicStrategy(
	function(username, password, callback) {
		User.findOne({ username: username }, function(err, user) {
			if (err) { return callback(err); }

			// No user found with that username
			if (!user) { return callback(null, false); }

			// Ensure the password was correct.
			user.verifyPassword(password, function(err, isMatch) {
				if (err) { return callback(err); }

				// Password didn't match.
				if (!isMatch) { return callback(null, false); }

				// Success
				return callback(null, user);
			});
		});
	}
));

passport.use('client-basic', new BasicStrategy(
	function(username, password, callback) {
		Client.findOne({ id: username }, function (err, client) {
			if (err) { return callback(err); }

			// no client found with that id or bad password
			if (!client || client.secret !== password) { return callback(null, false); }

			// success
			return callback(null, client);
		});
	}
));

passport.use(new BearerStrategy(
	function(accessToken, callback) {
		Token.findOne({ value: accessToken }, function (err, token) {
			if (err) { return callback(err); }

			// no token found
			if (!token) { return callback(null, false); }

			User.findOne({ _id: token.userId }, function (err, user) {
				if (err) { return callback(err); }

				// no user found
				if (!user) { return callback(null, false); }

				// simple example with no scope
				callback(null, user, { scope: '*' });
			});
		});
	}
));

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session: false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session: false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
// False session forces users/apps to submit username and password with each call.