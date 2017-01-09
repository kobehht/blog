var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();

mongolass.connect(config.mongodb);

exports.User = mongolass.model('User', {
    name: {type: Mongolass.Types.ObjectId},
    password: {type: 'string'},
    email: {type: 'string'}
});
exports.User.index({name: 1}, {unique: true}).exec();
