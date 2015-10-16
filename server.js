var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var ejs = require('ejs');
var session = require('express-session');
var beerController = require('./controllers/beerController');
var userController = require('./controllers/userController');
var authController = require('./controllers/authController');
var clientController = require('./controllers/clientController');
var oauth2Controller = require('./controllers/oauth2Controller');

// Connect to the BeerLocker MongoDB.
mongoose.connect('mongodb://localhost:27017/BeerLocker');

var app = express();
var router = express.Router();

// Use body-parser.
app.use(bodyParser.urlencoded({
	extended: true
}));

// Use passport.
app.use(passport.initialize());

// Set view engine to ejs.
app.set('view engine', 'ejs');

// OAuth2orize requires express session support.
app.use(session({
	secret: 'Super Secret Session Key',
	saveUninitialized: true,
	resave: true
}));

// Create endpoint handlers.
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

router.route('/clients')
	.post(authController.isAuthenticated, clientController.postClients)
	.get(authController.isAuthenticated, clientController.getClients);

router.route('/oauth2/authorize')
	.get(authController.isAuthenticated, oauth2Controller.authorization)
	.post(authController.isAuthenticated, oauth2Controller.decision);

router.route('/oauth2/token')
	.post(authController.isClientAuthenticated, oauth2Controller.token);	

// Register all routes with /api.
app.use('/api', router);

// Start server on port 3000.
app.listen(3000);
console.log('BeerLocker listening on port 3000...');