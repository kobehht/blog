var path = require('path');
var flash = require('connect-flash');
var express = require('express');
var session = require('express-session');
var routes = require('./routes');
var config = require('config-lite');
// var bodyParser = require('body-parser');
var pkg = require('./package');
// var formidable = require('express-formidable');
var MongoStore = require('connect-mongo')(session);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

// app.use(formidable());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// 设置session参数并存入mongo
app.use(session({
    name: config.session.name,
    secret: config.session.secret,
    cookie: {
        maxAge: config.session.maxAge
    },
    store: new MongoStore({
        url: config.mongodb
    })
}));

app.locals.blog = {
    title: pkg.name,
    description: pkg.description
};

app.use(function (req, res, next) {
    // res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});

routes(app);

app.use(function (err, req, res, next) {
    res.render('error', {
        error: err
    });
});

app.listen(config.port, function () {
    console.log(pkg.name + ' listening at port: ' + config.port);
});
