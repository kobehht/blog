var express = require('express');
var routes = require('./routes');
var config = require('config-lite');
var pkg = require('./package')

var app = express();

routes(app);

app.listen(config.port, function () {
    console.log(pkg.name + ' listening at port: ' + config.port);
});
