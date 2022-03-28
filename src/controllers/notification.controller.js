const Notification = require('../models/notification.model')
const User = require('../models/user.model')
const Post = require ('../models/post.model')
const router = require('express').Router();

router.route('/').get((req, res) => {
    Notification.find().sort({createdAt: -1})
    .then(allNotifications => res.json(allNotifications))
    .catch(err => res.status(400).json('Error! ' + err))
})


router.route('/:idPost').get((req, res) => {
    Notification.find({idPost:req.params.idPost})
    .then(allNotifications => res.json(allNotifications))
        .catch(err => res.status(400).json('Error! ' + err))

})

module.exports = router