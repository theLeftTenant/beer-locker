var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var path = require('path');
var beerController = require('./controllers/beerController');
var userController = require('./controllers/userController');
var authController = require('./controllers/authController');

//Connect to the BeerLocker MongoDB.
mongoose.connect('mongodb://localhost:27017/BeerLocker');

var app = express();
var router = express.Router();

//	Use body-parser.
app.use(bodyParser.urlencoded({
	extended: true
}));

//	Use passport.
app.use(passport.initialize());

//	Create endpoint handlers.
router.route('/beers')
	.post(authController.isAuthenticated, beerController.postBeers)
	.get(authController.isAuthenticated, beerController.getBeers);

router.route('/beers/:beer_id')
	.get(authController.isAuthenticated, beerController.getBeer)
	.put(authController.isAuthenticated, beerController.putBeer)
	.delete(authController.isAuthenticated, beerController.deleteBeer);

router.route('/users')
	.post(userController.postUsers)
	.get(authController.isAuthenticated, userController.getUsers);

router.route('/authenticate')
	.post(authController.isAuthenticated, function(req, res) {
		res.json(req.user);
	});

//	Register all routes with /api.
app.use('/api', router);

//	Add route for Angular frontend (outside "/api").
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
	console.log('Loaded index.html....');	//Issue: Source file paths route here.
});

//	Start server on port 3000.
app.listen(3000);
console.log('BeerLocker listening on port 3000...');