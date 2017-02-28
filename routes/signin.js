var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var sha1 = require('sha1');
var UserModel = require('../models/user');

router.get('/', checkNotLogin, function (req, res, next) {
    res.render('signin');
});

router.post('/', checkNotLogin, urlencodedParser, function (req, res, next) {
    console.log('[debug]post login');
    var name = req.body.name;
    var password = req.body.password;

    UserModel.getUserByName(name)
        .then(function (user) {
            if (!user) {
                req.flash('error', '用户名不存在');
                console.log('[debug]!user');
                return res.send({redirect: '/signin'});
            }
            if (sha1(password) != user.password) {
                req.flash('error', '用户名或密码错误');
                console.log('[debug]sha1(password) != user.password');
                return res.send({redirect: '/signin'});
            }
            req.flash('success', '登录成功');
            console.log('[debug] login success');
            delete user.password;
            req.session.user = user;
            res.send({redirect: '/user'});
        })
        .catch(next);
});

module.exports = router;
