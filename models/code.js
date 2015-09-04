var mongoose = require('mongoose');

// Code Schema for OAuth2
var CodeSchema = new mongoose.Schema({
	value: { type: String, required: true },
	redirectUri: { type: String, required: true },
	userId: { type: String, required: true },
	clientId: { type: String, required: true }
});

module.exports = mongoose.model('Code', CodeSchema);