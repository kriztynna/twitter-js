var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: false }));

//var tweetBank = require('../tweetBank');
var tweetBank = require('../models');

router.use(function(req,res,next){
	console.log(req.method+ ' / ' + res.statusCode);
	//console.log(req.url);
	//console.log(Object.keys(req));
	next();
});

router.get('/users/:name/:id',function(req,res){
	tweetBank.Tweet.find( {include: [tweetBank.User], where: {id : +req.params.id}} )
	.then(function(tweets){
	res.render('index',{title: 'Twitter.js - Post '+id+' by '+name, tweets: list, showForm: false});
	})
});


//currently functional but does not render user name on users/name page
router.get('/users/:name',function(req,res){
	tweetBank.User.find({ where: {name : req.params.name}})
	.then(function(user){
		return user.getTweets()
	})
	.then(function(tweets){
		var newTweets = tweets.map(function(elem){
			elem.User = {name: req.params.name }
			return elem;
			
		})
		res.render('index',{title: 'Twitter.js - Posts by '+req.params.name, tweets: newTweets, showForm: false })
	})
});


router.get('/', function (req, res) {
  tweetBank.Tweet.findAll({include:[tweetBank.User]}).then(
  	function (tweets) {
  		console.log(tweets[0])
    	res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
  });  
});

router.post('/submit',function(req,res){
	var name = req.body.name;
	var text = req.body.text;
	tweetBank.add(name,text);
	res.redirect('/');
});

module.exports = router;