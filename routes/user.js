var express = require('express');
var router = express.Router();

// 个人主页面
router.get('/', function (req, res) {
    res.render('user');
});

// 设置界面
router.get('/setting', function (req, res) {
    res.render('setting');
});

module.exports = router;
