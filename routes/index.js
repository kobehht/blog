module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/main');
    });
    app.use('/main', require('./main'));

    app.use(function (req, res) {
        if (!res.headerSent) {
            res.render('404');
        }
    });
};
