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
    var password = req.body.password;
    var repassword = req.body.repassword;
    var email = req.body.email;
    // res.send(req.body.name);

    // 用户输入检测
    try {
        if (!(name.lenth >= 3 && name.length <= 10)) {
            throw new Error('Username length should be 3 to 10');
        }
        if (!(password >= 6)) {
            throw new Error('Password length is at least 6');
        }
        if (!(password == repassword)) {
            throw new Error('Twice the input of the password is not the same');
        }
        if (!(/^(\w)+(\.\w+)*@(\w)+(\.\w)+/.test(email))) {
            throw new Error('E-mail format is incorrect');
        }
    } catch (e) {
        req.flash('error', e.massage);
        return res.send('error');
    }

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
            req.flash('success', '注册成功');
            res.send('success');
        })
        .catch(function (e) {
            // 判断用户名是否被占用
            if (e.massage.match('E1100 duplicate key')) {
                req.flash('error', '用户名已被占用');
                return res.send('error');
            }
            next(e);
        });
});

module.exports = router;
