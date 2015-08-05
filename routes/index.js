var express = require('express');

var router = express.Router();
var tweetBank = require('../tweetBank');

router.use(function(req,res,next){
	console.log(req.method+ ' / ' + res.statusCode);
	//console.log(req.url);
	//console.log(Object.keys(req));
	next();
});

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
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