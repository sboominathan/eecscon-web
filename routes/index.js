var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var passport = require('passport-local');
var password_hash = require('password-hash');
var nodemailer = require('nodemailer');
var randToken = require('rand-token');
var hbs = require('nodemailer-express-handlebars');
var config = require('../config')

/* Connecting to MySQL database */
var connection = mysql.createConnection({
  host     : config.dbhost,
  user     : config.dbuser,
  password : config.dbpassword,
  database : config.dbname
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

/* Setting up transporter for confirmation emails */
var smtpTransport = nodemailer.createTransport({
   service: "Gmail",  // sets automatically host, port and connection security settings
   auth: {
       user: config.username,
       pass: config.password
   }
});

var options = {
     viewEngine: {
         extname: '.hbs',
         layoutsDir: 'views/',
     },
     viewPath: 'views/',
     extName: '.hbs'
 };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

router.post('/signup', function(req, res, next) {
  var name = req.body.studentname;
  var email = req.body.email;
  var username = req.body.username;
  var password = password_hash.generate(req.body.password);
  var confirmationToken = randToken.generate(16);

  var post = {
    name: name,
    email: email,
    username: username,
    password: password,
    confirmationToken: confirmationToken,
    verified: "False",
    submitted: "False"
  }

  connection.query("SELECT username from users where username='"+username+"'", function(err,rows){
    if (rows.length == 0){
      connection.query('INSERT INTO users SET ?', post, function (err, result) {
        if (err){
        console.log(err);
      } else{
        req.session.user = username;
        req.session.verified = false;
        req.session.submitted = false;
        console.log("New user received.");
        smtpTransport.use('compile', hbs(options));
        var mail = {
            from: 'sooraj.boomi@gmail.com', // sender address
            to: email, // list of receivers
            subject: 'Thanks for Signing up for EECScon!', // Subject line
            template: 'signup-email', // html body
            context: {
              confirmationLink: "eecscon.mit.edu/verify/"+username+"/"+confirmationToken,
              username: username 
            }
        };
        smtpTransport.sendMail(mail, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message has been sent: ' + info.response);

        })
      } 
      });
      res.render('signup', {message: 'Sign Up', error: 'Thanks for signing up for EECScon! Please check your email for a verification link.' });
    }
    else{
      res.render('signup', {message: 'Sign Up', error: 'That username is taken.' });
    }
    });
  
});

router.get('/signup', function(req, res, next) {
  if (req.session && req.session.user && req.session.verified){
    res.redirect('/application');
  } else{
    res.render('signup', { message: 'Sign Up' });
  }
});

router.get('/login', function(req, res, next) {
  if (req.session && req.session.user && req.session.verified){
    res.redirect('/application');
  } else{
    res.render('signup', { message: 'Login' });
  }
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  connection.query("SELECT * from users where username='"+username+"'", function(err,rows){
    if (rows.length == 1){
      console.log(rows[0]);
      var user = rows[0];
      if (password_hash.verify(password, user['password'])){
        if (user['submitted']=='True'){
          req.session.submitted = true;
        }
        if (user['verified']=='True'){
          req.session.user = user['username'];
          req.session.verified = true;
          res.redirect('/application');
        } else{
          res.render('signup', {message: 'Login', error: 'Please check your account for a verification link' });
        }
        
      } else{
        res.render('signup', {message: 'Login', error: 'Invalid username or password.' });
      }
    }
    else{
      res.render('signup', { title: 'Express' });
    }
    });
});

router.get('/verify/:username/:confirmationToken', function(req, res, next){

  var username = req.params.username;
  var confirmationToken = req.params.confirmationToken;
  connection.query("SELECT * from users where username='"+username+"'", function(err,rows){
    if (rows.length == 1){

      var user = rows[0];
      if (confirmationToken == user['confirmationToken']){
        req.session.user = user['username'];
        
         connection.query("UPDATE users set verified='True' where username ='"+username+"'", function(err,rows){
          if (err){
            console.log(err);
          }
         });
        res.redirect('/application');
      } else{
        res.render('signup', {message: 'Login', error: 'Invalid verification link.' });
      }
    }
    else{
      res.render('signup', {message: 'Login', error: 'That user does not exist.' });
    }
    });

});

router.get('/application', function(req, res, next) {
  if (req.session && req.session.user){
    var username = req.session.user;
    if (req.session.submitted){
      connection.query("SELECT * from applications where username='"+username+"'", function(err,rows){
        var user = rows[0];
        res.render('application', {message: "Thanks for applying to EECScon! You can come back and edit your application at any time.", errors: 'Edit Application', firstname:user['firstname'],lastname:user['lastname'],email:user['email'], year: user['year'], course: user['course'], superurop: user['superurop'], advisor: user['advisor'], presentation: user['presentation'], field: user['field'], specify: user['specify'], abstract: user['abstract']});
      });

    } else if (!(req.session.verified)){
      res.render('application', { message: 'Thanks for verifying your account!'});
      req.session.verified = true;
    } else{
      res.render('application',{});
    }
    
  } else{
    res.redirect('/signup');
  }
});

router.post('/apply', function(req,res,next){

  var username = req.session.user;

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
    abstract: req.body.abstract,
    username: username
  }

  if (req.session.submitted){
    connection.query("DELETE FROM applications WHERE username='"+username+"'",function (err, result) {
      if (err){
        console.log(err);
      }
    });
  }

  connection.query('INSERT INTO applications SET ?', post, function (err, result) {
      if (err){
        console.log(err);
      } else {
        console.log("new application received");
        req.session.submitted = true;
        connection.query("UPDATE users set submitted='True' where username ='"+username+"'", function(err,rows){
          if (err){
            console.log(err);
          }
        });
      }
      res.redirect("/application");
  });
  
 
})

router.get('/signout',function(req,res,next){
  req.session.reset();
  res.render("index",{});
})

module.exports = router;
