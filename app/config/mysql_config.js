'use strict';

let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'login_passport_1'
});

connection.connect();

module.exports = connection;
