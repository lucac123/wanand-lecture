const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const sessions = require('express-session');

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
	apiKey: "AIzaSyDiJug25K6a-_Did5PHSPc35VgihJJMwYk",
	authDomain: "lecture-of-wanand.firebaseapp.com",
	projectId: "lecture-of-wanand",
	storageBucket: "lecture-of-wanand.appspot.com",
	messagingSenderId: "162477953077",
	appId: "1:162477953077:web:49493b96590a30d367e17c",
	measurementId: "G-KRLR96ZL9K"
};
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
	secret: "ayoonwanandIGottaGiveItToYou",
	saveUninitialized: true,
	cookie: {maxAge: oneDay},
	resave: false
}));

const server_dir = path.join(__dirname, 'public');
const public_dir = path.join(__dirname, 'view', 'public');
const user_dir = path.join(__dirname, 'view', 'user');
const port = process.env.PORT || 3000;


app.use(express.static(path.join(server_dir)));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	if (req.session.user) {
		res.sendFile(path.join(user_dir, 'explore.html'));
	}
	else {
		res.sendFile(path.join(public_dir, 'index.html'));
	}
})

app.post('/login.html', (req, res) => {
	db.collection('users').get()
	.then((q) => {
		q.forEach((doc) => {
			if (doc.data().username == req.body.username) {
				if (doc.data().pass == req.body.password) {
					req.session.user = true;
				}
			}
		})
		res.redirect('/');
	})
	.catch((e) => console.error(`Error: ${e}`));
})
app.post('/signup.html', (req, res) => {
	db.collection('users').add({
		name: req.body.name,
		username: req.body.username,
		pass: req.body.password
	})
	.then(() => {
		req.session.user = true;
		res.redirect('/');		
	})
	.catch((e) => console.error(`Error: ${e}`));

})

app.get('/logout', (req, res) => {
	req.session.user = false;
	res.redirect('/');
})

app.get('/*', (req, res) => {
	let view = (req.session.user)? user_dir : public_dir;
	res.sendFile(path.join(view, req.url));
});

server.listen(port, () => console.log(`Server started on port ${port}`));
