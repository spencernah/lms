const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const {addCustomerPage, addCustomer} = require('./adding');
const {adminPage, viewTable, editTable, editPage} = require('./admin');

const {
  promisify,
} = require('util');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const mysql = require('mysql');
const mydatabase = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'TIC2601',
  database: 'lms'
});

mydatabase.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
global.mydatabase = mydatabase;


const queryAsync = promisify(mydatabase.query).bind(mydatabase);

app.get('/', (req, res) => {
  
  
  try {
    
    res.render('home', {
    });
  } catch (err) {
    console.log('SQL error', err);
    res.status(500).send('Something went wrong');
  }
});
app.get('/addCustomer',addCustomerPage);
app.post('/addCustomer',addCustomer);
app.get('/admin',adminPage);
app.get('/admin/view',viewTable);
app.get('/edit',editPage);
app.post('/edit',editTable);

var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})