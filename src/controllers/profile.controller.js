// profile controller
const Profile = require('../models/profile.model');
const router = require('express').Router();



router.route('/').get((req, res) => {
  // using .find() without a paramter will match on all profile instances
  const query = req.query ? req.query : []
  console.log(query)
  Profile.find(query).populate('user_info')
    .then(allProfiles => res.json(allProfiles))
    .catch(err => res.status(400).json('Error! ' + err))
})
router.route('/user').get((req, res) => {
  // using .find() without a paramter will match on all profile instances
  const query = req.query ? req.query : []
  console.log(query)
  Profile.find(query)
    .then(allProfiles => res.json(allProfiles))
    .catch(err => res.status(400).json('Error! ' + err))
})
router.route('/:profileId').get((req, res) => {
  // using .find() without a paramter will match on all profile instances

  Profile.findById(req.params.profileId).populate('user_info')
    .then(profiles => res.json(profiles))
    .catch(err => res.status(400).json('Error! ' + err))
})
router.route('/').post((req, res) => {
  const newProfile = new Profile(req.body)

  newProfile.save()
    .then(profile => res.json(profile))
    .catch(err => res.status(400).json("Error! " + err))
})
router.route('/:profileId').delete((req, res) => {
  Profile.deleteOne({ _id: req.params.profileId })
    .then(profile => res.json('Success! User deleted.'))
    .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/:profileId').put((req, res) => {
  Profile.findByIdAndUpdate(req.params.profileId, req.body)
    .then(profile => res.json('Success! profile updated.'))
    .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router