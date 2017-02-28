var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();

mongolass.connect(config.mongodb);

exports.User = mongolass.model('User', {
    name: {type: 'string'},
    password: {type: 'string'},
    email: {type: 'string'}
});
exports.User.index({name: 1}, {unique: true}).exec();

exports.Post = mongolass.model('Post', {
    author: {type: Mongolass.Types.ObjectId},
    title: {type: 'string'},
    content: {type: 'string'}
});
exports.Post.index({author: 1, _id: -1}).exec();
