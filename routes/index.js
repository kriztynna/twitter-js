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