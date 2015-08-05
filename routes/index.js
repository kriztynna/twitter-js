var express = require('express');
var path = require('path');


var router = express.Router();
var tweetBank = require('../tweetBank');

var bodyParser = require('body-parser');
//router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: false }));

router.use(function(req,res,next){
	console.log(req.method+ ' / ' + res.statusCode);
	//console.log(req.url);
	//console.log(Object.keys(req));
	next();
});

router.get('/users/:name/:id',function(req,res){
	var name = req.params.name.split(" ").map(function(a){return a[0].toUpperCase()+a.slice(1).toLowerCase();}).join(" ");
	var id = +req.params.id;
	var list = tweetBank.find({id: id});
	res.render('index',{title: 'Twitter.js - Post '+id+' by '+name, tweets: list, showForm: false});
});

router.get('/users/:name',function(req,res){
	var name = req.params.name.split(" ").map(function(a){return a[0].toUpperCase()+a.slice(1).toLowerCase();}).join(" ");
	var list = tweetBank.find({name: name});
	res.render('index',{title: 'Twitter.js - Posts by '+name, tweets: list, showForm: false});
});

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );  	
});

router.get('/**', function (req, res) {
  	res.sendFile( path.resolve(__dirname+'/../public'+req.path) );
});

router.post('/submit',function(req,res){
	var name = req.body.name;
	var text = req.body.text;
	tweetBank.add(name,text);
	res.redirect('/');
});


module.exports = router;