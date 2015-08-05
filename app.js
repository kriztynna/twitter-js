var express = require('express');
var swig = require('swig');
var app = express();

app.use(function(req,res,next){
	console.log(req.method+ ' / ' + res.statusCode);
	//console.log(req.url);
	//console.log(Object.keys(req));
	next();
});

app.get('/',function(req,res) {
	var locals = {title: 'homepage', people: [{name: 'Kim'}, {name: 'Cristina'} ] };
	console.log(__dirname);
	swig.renderFile(__dirname + '/views/index.html', locals, function (err, output) {
	  if (err) {
	    throw err;
	  }
		res.set('Status', 200);
	  res.send(output);
	});
});

app.get('/news',function(req,res){
	res.set('Status', 200);
	res.send('this is the BEST news page');
});
//hello
app.listen(3000);
