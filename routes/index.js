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
  console.log(req);
  if(req.path==='/'){
	  var tweets = tweetBank.list();
	  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );  	
  }
  else {
  	res.sendFile( path.normalize(__dirname+'/../public'+req.path) );
  }
});


module.exports = router;

/*
app.get('/',function(req,res) {
	var locals = {title: 'homepage', people: [{name: 'Kim'}, {name: 'Cristina'} ] };
	var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
	res.render( 'index', {title: 'Hall of Fame', people: people} );
	// swig.renderFile(__dirname + '/views/index.html', locals, function (err, output) {
	//   if (err) {
	//     throw err;
	//   }
	// 	res.set('Status', 200);
	//   res.send(output);
	// });

});

app.get('/news',function(req,res){
	res.set('Status', 200);
	res.send('this is the BEST news page');
});
*/