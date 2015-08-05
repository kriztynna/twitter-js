var express = require('express');
var swig = require('swig');
var app = express();

swig.setDefaults({ cache: false});

app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', __dirname + '/views');


app.use(function(req,res,next){
	console.log(req.method+ ' / ' + res.statusCode);
	//console.log(req.url);
	//console.log(Object.keys(req));
	next();
});

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
//hello
app.listen(3000);
