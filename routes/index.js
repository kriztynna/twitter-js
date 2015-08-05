var express = require('express');
var path = require('path');

var router = express.Router();
var tweetBank = require('../tweetBank');
router.use(express.static('public'));

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
	res.render('index',{title: 'Twitter.js - Post '+id+' by '+name, tweets: list});
});

router.get('/users/:name',function(req,res){
	var name = req.params.name.split(" ").map(function(a){return a[0].toUpperCase()+a.slice(1).toLowerCase();}).join(" ");
	var list = tweetBank.find({name: name});
	res.render('index',{title: 'Twitter.js - Posts by '+name, tweets: list});
});

router.get('/', function (req, res) {
  if(req.path==='/'){
	  var tweets = tweetBank.list();
	  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );  	
  }
  else {
  	res.sendFile( path.normalize(__dirname+'/../public'+req.path) );
  }
});


module.exports = router;