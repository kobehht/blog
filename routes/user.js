var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var PostModel = require('../models/post');

// 个人主页面
router.get('/', checkLogin, function (req, res, next) {
    var author = req.session.user._id;
    console.log(req.body);

    PostModel.getPosts(author)
        .then(function (posts) {
            res.render('user', {
                posts: posts
            });
        })
        .catch(next);
});

// 设置页面
router.get('/setting', checkLogin, function (req, res, next) {
    res.render('setting');
});

//写文章页面
router.get('/create', checkLogin, function (req, res, next) {
    res.render('create');
});

//写文章页面post
router.post('/create', checkLogin, urlencodedParser, function (req, res, next) {
    console.log('/create');
    var title = req.body.title;
    var content = req.body.content;
    var author = req.session.user._id;

    try {
        if (!title.length) {
            throw new Error('please write title.');
        }
        if (!content.length) {
            throw new Error('please write content.');
        }
    } catch (e) {
        req.flash('error', e.message);
    }

    var post = {
        author: author,
        title: title,
        content: content
    };

    PostModel.create(post)
        .then(function (result) {
            post = result.ops[0];
            req.flash('success', 'create success');
            res.send({redirect: '/user'});
        })
        .catch(next);
});

//单独文章页面
router.get('/:postId', function (req, res, next) {
    var postId = req.params.postId;

    Promise.all([
        PostModel.getPostById(postId)
    ])
    .then(function (result) {
        var post = result[0];

        if (!post) {
            throw new Error('the post is not exist');
        }
        res.render('posts', {
            post: post
        });
    })
    .catch(next);
});

module.exports = router;
