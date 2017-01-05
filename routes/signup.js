var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// /signup  注册页面get请求
router.get('/', checkNotLogin, function (req, res, next) {
    res.render('signup');
});

// /signup 注册页面post请求，注册账号
router.post('/', checkNotLogin, function (req, res, next) {
    var name = req.fields.username;
    var password = req.fields.password;
    var repassword = req.fields.repassword;
    var email = req.fields.email;
});

module.exports = router;
