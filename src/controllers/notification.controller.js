const Notification = require('../models/notification.model')
const User = require('../models/user.model')
const Post = require ('../models/post.model')
const router = require('express').Router();

router.route('/').get((req, res) => {
<<<<<<< HEAD
    Notification.find().sort({createdAt: -1}).limit(2)
=======
    Notification.find().sort({createdAt: -1})
>>>>>>> dev
    .then(allNotifications => res.json(allNotifications))
    .catch(err => res.status(400).json('Error! ' + err))
})

<<<<<<< HEAD
router.route('/:idUser').get((req, res) => {

    Post.find({user_info:req.params.idUser})
        .then(post => {
            return Notification.find({ idPost: post._id })
                .then(notification => res.json(notification))
                .catch(err => res.status(400).json('Error! ' + err))
        })
    .catch(err => res.status(400).json('Error! ' + err))
=======

router.route('/:idPost').get((req, res) => {
    Notification.find({idPost:req.params.idPost})
    .then(allNotifications => res.json(allNotifications))
        .catch(err => res.status(400).json('Error! ' + err))
>>>>>>> dev

})

module.exports = router