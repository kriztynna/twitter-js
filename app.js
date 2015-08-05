var express = require('express');
var app = express();
var path = require('path');

var swig = require('swig');
swig.setDefaults({ cache: false});

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.normalize(__dirname+'/views'));

var routes = require('./routes');
app.use('/',routes);

app.listen(3000);