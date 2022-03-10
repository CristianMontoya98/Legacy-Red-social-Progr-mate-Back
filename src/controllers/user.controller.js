// user controller
const User = require('../models/user.model')
const router = require('express').Router()



router.route('/').get((req, res) => {
    // using .find() without a paramter will match on all user instances
    const query = req.query ? req.query : []
    console.log(query)
    User.find(query)
        .then(allUsers => res.json(allUsers))
        .catch(err => res.status(400).json('Error! ' + err))
})
router.route('/:userId').get((req, res) => {

    User.findById(req.params.userId)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error! ' + err))
})
router.route('/').post((req, res) => {
    const data = req.body;
    const newUser = new User(data)

    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error! " + err))
})
router.route('/:userId').delete((req, res) => {
    User.deleteOne({ _id: req.params.userId })
        .then(success => res.json('Success! User deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/:userId').put((req, res) => {
    User.findByIdAndUpdate(req.params.userId, req.body)
        .then(user => res.json('Success! User updated.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router