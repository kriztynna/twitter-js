var express = require('express');
var swig = require('swig');
var app = express();

app.use(function(req,res,next){
	console.log(req.method+ ' / ' + res.statusCode);
	//console.log(req.url);
	//console.log(Object.keys(req));
	next();
});

app.get('/',function(req,res){
	res.set('Status', 200);
	res.send('server listening again');
});

app.get('/news',function(req,res){
	res.set('Status', 200);
	res.send('this is the BEST news page');
});
//hello
app.listen(3000);
