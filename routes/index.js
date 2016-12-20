var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'sql.mit.edu',
  user     : 'think',
  password : 'awesomeTHINK02139',
  database : 'think+think2017'
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/application', function(req, res, next) {
  res.render('application', { title: 'Express' });
});

router.post('/submit', function(req, res, next) {

	  var name = req.body.field1;
	  var age = req.body.field5;
	  var email = req.body.field2;
	  var phone = req.body.field11;
	  var address = req.body.field6;
	  var city = req.body.field7;
	  var state = req.body.field8;
	  var zipCode = req.body.field9;
	  var school = req.body.field10;

	  var club = req.body.field12;
	  var excitement = req.body.field13;
	  var interest = req.body.field14;
	  var location = req.body.field15;
	  var group = req.body.group;

	  var post  = {
		  name: name,
		  age: age,
		  email: email,
		  phone: phone,
		  address: address,
		  city: city,
		  state: state,
		  zip: zipCode,
		  school: school,
		  club: club,
		  excitement: excitement,
		  interest: interest,
		  location: location,
		  group: group
	   };

	 // connection.connect();

	connection.query('INSERT INTO out_of_the_box SET ?', post, function (err, result) {
		if (err){
			console.log(err);
		} else{
			console.log("New application received.");
		}	
		// connection.end();

	});

  res.render('submission', { title: 'Express' });
});

// router.get('/submit', function(req, res, next) {
// 	res.render('submission', { title: 'Express' });
// });
module.exports = router;
