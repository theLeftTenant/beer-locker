var User = require('../models/user');

// POST: Add a new User.
exports.postUsers = function(req, res) {
	var user = new User({
		username: req.body.username,
		password: req.body.password
	});

	user.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'New beer lover added to the locker room!' });		
	});
};

// GET: Return all users (for dev only).
exports.getUsers = function(req, res) {
	User.find(function(err, users) {
		if (err)
			res.send(err);

		res.json(users);
	});
};