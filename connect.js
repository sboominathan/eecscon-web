'use strict';

const mysql = require('mysql');
let connection = mysql.createConnection({
    host     : 'sql.mit.edu',
    user     : 'jinglin',
    password : 'pup30fad',
    database : 'jinglin+personal'
});

connection.connect(function(err) {
    if (err) {
        console.log("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});
