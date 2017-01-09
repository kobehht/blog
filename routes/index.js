module.exports = function (app) {
    // 默认跳转至主页
    app.get('/', function (req, res) {
        res.redirect('/main');
    });

    app.use('/main', require('./main'));
    app.use('/signin', require('./signin'));
    app.use('/signup', require('./signup'));

    // 404页面
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.render('404');
        }
    });
};
