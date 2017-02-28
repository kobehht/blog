var Post = require('../lib/mongo').Post;

module.exports = {
    create: function create(post) {
        return Post.create(post).exec();
    },

    getPostById: function getPostById(postId) {
        return Post
            .findOne({_id: postId})
            .populate({path: 'author', model: 'User'})
            .exec();
    },

    getPosts: function getPosts(author) {
        var query = {};
        console.log('[debug]getPosts');
        if (author) {
            query.author = author;
            console.log('[debug]author:' + query.author);
        }
        return Post
            .find(query)
            .populate({path: 'author', model: 'User'})
            .sort({_id: -1})
            .exec();
    }
};
