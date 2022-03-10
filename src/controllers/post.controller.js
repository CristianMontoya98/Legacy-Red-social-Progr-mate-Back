// profile controller
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const Like = require('../models/like.model');
const router = require('express').Router();



router.route('/').get((req, res) => {
  const query = req.query ? req.query : []
  console.log(query)
  Post.find(query)
    .then(allPosts => res.json(allPosts))
    .catch(err => res.status(400).json('Error! ' + err))
})
router.route('/:postId').get((req, res) => {
  Post.findById(req.params.postId).populate("comments").populate("likes").populate("user_info")
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/').post((req, res) => {
  console.log(req.body)
  const newPost = new Post(req.body)

  newPost.save()
    .then(post => res.json(post))
    .catch(err => res.status(400).json("Error! " + err))
})
//Creating comments into Post
router.route('/comment/:postId').post((req, res) => {
  //in this part we are going to create a new endpoint to added the comment into the post

  Comment.create(req.body)
    .then((comment) => {
      //if a comment was created succesfully, let's go to find one (findOne)post with an _id equal to req.params.postId. Update is for our post in order to be associdated with a new comment 
      //{new:true} tells the query that we want it to return the updated post
      return Post.findOneAndUpdate({ _id: req.params.postId }, { $push: { comments: comment._id } }, { new: true })
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error! ' + err))
    })
})
router.route('/like/:postId').post((req, res) => {
  //in this part we are going to create a new endpoint to added the comment into the post

  Like.create(req.body)
    .then((like) => {
      //if a comment was created succesfully, let's go to find one (findOne)post with an _id equal to req.params.postId. Update is for our post in order to be associdated with a new comment 
      //{new:true} tells the query that we want it to return the updated post
      return Post.findOneAndUpdate({ _id: req.params.postId }, { $push: { likes: like._id } }, { new: true })
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error! ' + err))
    })
})


router.route('/:postId').delete((req, res) => {
  Post.deleteOne({ _id: req.params.postId })
    .then(post => res.json('Success! post deleted.'))
    .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/:postId').put((req, res) => {
  Post.findByIdAndUpdate(req.params.postId, req.body)
    .then(profile => res.json('Success! post updated.'))
    .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router