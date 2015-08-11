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
	tweetBank.Tweet.findOne( {include: [tweetBank.User], where: {id : +req.params.id} } )
	.then(function(oneTweet){
		var newTweet = [{tweet: oneTweet.tweet, User: {name: oneTweet.User.name, pictureUrl: oneTweet.User.pictureUrl}, id: oneTweet.id}];
	res.render('index',{title: 'Twitter.js - Post '+req.params.id+' by '+req.params.name, tweets: newTweet, showForm: false});
	})
});


//currently functional but does not render user name on users/name page
router.get('/users/:name',function(req,res){
	tweetBank.User.find({ where: {name : req.params.name}})
	.then(function(user){
		var picture = user.pictureUrl;
		return user.getTweets().map(function(elem){
			elem.User = {name: req.params.name, pictureUrl: picture };
			return elem;
		});
	})
	.then(function(tweets){
		res.render('index',{title: 'Twitter.js - Posts by '+req.params.name, tweets: tweets, showForm: false })
	})
});


router.get('/', function (req, res) {
  tweetBank.Tweet.findAll({include:[tweetBank.User]}).then(
  	function (tweets) {
  		res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
  });  
});

router.post('/submit',function(req,res){
	var name = req.body.name;
	var text = req.body.text;
	tweetBank.User.findOrCreate({where: {name: req.body.name, pictureUrl: '/JumpyPanda.jpg'}}).spread(function(user){
		tweetBank.Tweet.create({UserId: user.id, tweet:req.body.text});
		res.redirect('/');
	});
});

module.exports = router;