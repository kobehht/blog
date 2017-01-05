var path = require('path');
var flash = require('connect-flash');
var express = require('express');
var routes = require('./routes');
var config = require('config-lite');
var pkg = require('./package');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

app.locals.blog = {
    title: pkg.name,
    description: pkg.description
};

routes(app);

app.listen(config.port, function () {
    console.log(pkg.name + ' listening at port: ' + config.port);
});
