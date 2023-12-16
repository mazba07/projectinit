const formidable = require('formidable');
const FSDB = require("file-system-db");
const db = new FSDB("./db.json", false);

var expFn = {};

function sendJson(success, message, data = []) {
    var data = {
        "success": success,
        "message": message,
        "data": data
    }
    return data;
}

expFn.addNewPost = function (req, res, next) {
    const d = new Date();
    var postData = {
        "id": d.getTime(),
        "title": req.body.title,
        "body": req.body.body
    }
    db.push("post", postData);

    var io = req.app.get('socketIo');
    io.emit('addedPostHome', postData);

    res.json(sendJson(1, "Post added successfully"));
}

expFn.getAllPost = function (req, res, next) {
    var post = db.get("post");
    res.json(sendJson(1, "All post are here", post));
}

expFn.deletePost = function (req, res, next) {
    var id = req.params.id;
    var post = db.get("post");
    // db.delete("post");

    // for (let item of post) {
    //     if (item.id != parseInt(id)) {
    //         db.push("post", item);
    //     }
    // }


    db.delete("post.id.1672134756078");


    res.json(sendJson(1, "Post has been deleted", post));
}

expFn.singlePost = function (req, res, next) {
    var data = {};
    var id = req.params.id;
    var post = db.get("post");
    for (let item of post) {
        if (item.id == id) {
            data.singlePost = item;
        }
    }

    var allComments = db.get("comment");
    var singlePostComments = [];
    for (let item of allComments) {
        if (item.id == id) {
            singlePostComments.push(data.comments = item);
        }
    }
    data.comments = singlePostComments;

    res.json(sendJson(1, "Single post is here", data));
}

expFn.postNewComment = function (req, res, next) {
    var postData = {
        "id": parseInt(req.body.id),
        "commetnBody": req.body.commetnBody,
    }
    db.push("comment", postData);

    var io = req.app.get('socketIo');
    io.emit('postComment-' + req.body.id, postData);

    res.json(sendJson(1, "Comment posted successfully"));
}



module.exports = expFn;