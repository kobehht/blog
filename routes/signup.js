var express = require('express');
var sha1 = require('sha1');
var bodyParser = require('body-parser');
var router = express.Router();
var UserModel = require('../models/user');
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var urlencodedParser = bodyParser.urlencoded({ extended: false });



// /signup  注册页面get请求
router.get('/', checkNotLogin, function (req, res, next) {
    res.render('signup');
});

// /signup 注册页面post请求，注册账号
router.post('/', checkNotLogin, urlencodedParser, function (req, res, next) {
    // console.log('[debug]/signup post');
    var name = req.body.name;
    // console.log(name.length);
    var password = req.body.password;
    var repassword = req.body.repassword;
    var email = req.body.email;
    // res.send(req.body.name);

    // 用户输入检测
    try {
        if (!(name.length >= 3 && name.length <= 10)) {
            console.log('[debug]name bug');
            throw new Error('Username length should be 3 to 10');
        }
        if (!(password.length >= 6)) {
            console.log('[debug]password bug');
            throw new Error('Password length is at least 6');
        }
        if (!(password == repassword)) {
            console.log('[debug]repassword bug');
            throw new Error('Twice the input of the password is not the same');
        }
        if (!(/^(\w)+(\.\w+)*@(\w)+(\.\w)+/.test(email))) {
            console.log('[debug]email bug');
            throw new Error('E-mail format is incorrect');
        }
    } catch (e) {
        console.log('[debug]enter catch fn');
        req.flash('error', e.massage);
        // return res.redirect('/signup');
        res.send({redirect: '/signup'});
    }
    console.log('[debug]after try');

    password = sha1(password);

    var user = {
        name: name,
        password: password,
        email: email
    };

    UserModel.create(user)
        .then(function (result) {
            user = result.ops[0];
            delete user.password;
            req.session.user = user;
            console.log('[debug]create user');
            req.flash('success', '注册成功');
            // res.redirect('/main');
            res.send({redirect: '/main'});
        })
        .catch(function (e) {
            // 判断用户名是否被占用
            console.log(e.message);
            if (e.message.match('E11000 duplicate key')) {
                req.flash('error', '用户名已被占用');
                // return res.redirect('/signup');
                return res.send({redirect: '/signup'});
            }
            next(e);
        });
});

module.exports = router;
