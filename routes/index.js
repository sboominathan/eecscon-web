var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var passport = require('passport-local');
var password_hash = require('password-hash');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'eecscon'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', function(req, res, next) {
  var name = req.body.studentname;
  var email = req.body.email;
  var username = req.body.username;
  var password = password_hash.generate(req.body.password);

  var post = {
    name: name,
    email: email,
    username: username,
    password: password
  }

  connection.query("SELECT username from users where username='"+username+"'", function(err,rows){
    if (rows.length == 0){
      connection.query('INSERT INTO users SET ?', post, function (err, result) {
        if (err){
        console.log(err);
      } else{
        console.log("New user received.");
      } 
      });
      res.render('application', { title: 'Express' });
    }
    else{
      res.render('signup', { title: 'Express' });
    }
    });
  
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { message: 'Sign Up' });
});

router.get('/login', function(req, res, next) {
  res.render('signup', { message: 'Login' });
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  connection.query("SELECT * from users where username='"+username+"'", function(err,rows){
    if (rows.length == 1){
      console.log(rows[0]);
      var user = rows[0];
      if (password_hash.verify(password, user['password'])){
        req.session.user = user['username'];
        res.render('application',{ title: 'Express' });
      } else{
        res.render('signup',{ title: 'Express' });
      }
    }
    else{
      res.render('signup', { title: 'Express' });
    }
    });
});

router.get('/application', function(req, res, next) {
  if (req.session && req.session.user){
    res.render('application', { title: 'Express' });
  } else{
    res.render('signup', { message: 'Login' });
  }
});

router.post('/apply', function(req,res,next){

  var post = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    year: req.body.year,
    course:req.body.course,
    superurop: req.body.superurop,
    advisor: req.body.advisor,
    presentation: req.body.presentation,
    field: req.body.field,
    specify: req.body.specify,
    abstract: req.body.abstract
  }

  connection.query('INSERT INTO applications SET ?', post, function (err, result) {
      if (err){
        console.log(err);
      } else {
        console.log("new application received");
      }
  });

  res.render("index",{});

})

module.exports = router;
