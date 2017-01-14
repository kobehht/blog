var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;

// 登出
router.get('/', checkLogin, function (req, res) {
    console.log('[debug]signout');
    req.session.user = null;
    req.flash('success', '登出成功');
    res.redirect('/main');
});

module.exports = router;
