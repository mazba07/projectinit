var express = require('express');
var bodyParser = require('body-parser')
var postController = require('../controllers/postController')
var router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: true })


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add-new-post', urlencodedParser, postController.addNewPost);
router.get('/get-all-post', postController.getAllPost);
router.get('/delete-post/:id', postController.deletePost);
router.get('/single-post/:id', postController.singlePost);
router.post('/post-new-comment', urlencodedParser, postController.postNewComment);

module.exports = router;
