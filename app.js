var express = require('express');
var app = express();
var path = require('path');

var swig = require('swig');
swig.setDefaults({ cache: false});

// tells the app where to find any views for res.render
app.engine('html', swig.renderFile);
// tells the app to render views using the html engine
app.set('view engine', 'html');
// tells the app what function to use for rendering html
app.set('views', path.normalize(__dirname+'/views'));

var routes = require('./routes');
app.use('/',routes);

app.listen(3000);