const mysql = require('mysql');

const db_config = require('./config.json');

const mydatabase = mysql.createConnection({

    host: confiq.host,
    user: confiq.user,
    password: confiq.password,
    database: confiq.database

});

mydatabase.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });

module.exports = mydatabase;