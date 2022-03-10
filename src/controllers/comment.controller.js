// profile controller
const Comment = require('../models/comment.model');
const router = require('express').Router();

router.route('/').get((req, res) => {
  Comment.find()
    .then(allcomments => res.json(allcomments))
    .catch(err => res.status(400).json('Error! ' + err))
})
router.route('/:commentId').get((req, res) => {
  Comment.findById(req.params.commentId).populate('user_id')
    .then(comment => res.json(comment))
    .catch(err => res.status(400).json('Error! ' + err))
})
router.route('/').post((req, res) => {
  const newComment = new Comment(req.body)

  newComment.save()
    .then(comment => res.json(comment))
    .catch(err => res.status(400).json("Error! " + err))
})
router.route('/:commentId').delete((req, res) => {
  Comment.deleteOne({ _id: req.params.commentId })
    .then(comment => res.json('Success! comment deleted.'))
    .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/:commentId').put((req, res) => {
  Comment.findByIdAndUpdate(req.params.commentId, req.body)
    .then(comment => res.json('Success! comment updated.'))
    .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router