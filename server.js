const express = require('express');
const bodyParser= require('body-parser');
const path = require('path');
const http = require('http');
const Pusher = require('pusher');
const cryptoJS = require('crypto-js');

const pusherCredentials = require('./pusherCredentials');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const pusher = new Pusher ({
	appId: pusherCredentials.appId,
	key: pusherCredentials.key,
	secret: pusherCredentials.secret,
	cluster: 'us2',
	encrypted: true
});

app.use(express.static('./dist/'));

app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	next();
});

app.post('./pusher/auth', function(req, res) {
	var socketId = req.body.socket_id;
	var channel = req.body.channel_name;
	var presenceData = {
		user_id: crypto.randomBytes(16).toString("hex")
	};
	var auth = pusher.authenticate(socketId, channel, presenceData);
	res.send(auth);
});

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, './dist/index.html'))
});

var port = process.env.PORT || 3000;

// app.set('port', port);

// const server = http.createServer(app);

// server.listen(port, () => console.log(`API running on localhost:${port}`));

app.listen(port, function() {
	console.log('Listening on port 3000');
})