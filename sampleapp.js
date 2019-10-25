// importing modules 
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');

const app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(cors());

// Database Connection
const connection = mysql.createConnection({

host: 'localhost',
user: 'root',
password: 'TIC2601',
database: 'test'

});

connection.connect(err => {
	if(err) {
		return err;
	}
});

// SQL Queries
const SELECT_ALL_BOOKS = 'select * from myapp.book';


//Page Rendering - Log In
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
	res.render('sampleapp');	
});

// Post Method when getting log in details
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.render('samplelogin', {
			name : request.session.username
		});	
		//response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});


app.get('/selectall', (req,res) => {
	
	connection.query(SELECT_ALL_BOOKS, (err,results) =>{
		if(err){
			return res.send(err)
		}
		else {
			return res.json({
				data: results
			})
		}
	});
});


app.listen(3000, () => {
	console.log('Sample App listening on port 3000')
});