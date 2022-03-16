// conhorte

const Cohorte = require('../models/cohorte.model');
const router = require('express').Router();

router.route('/').get((req, res) => {
  Cohorte.find()
    .then(allCohortes => res.json(allCohortes))
    .catch(err => res.status(400).json('Error! ' + err))
})
router.route('/:cohorteId').get((req, res) => {
  Cohorte.findById(req.params.cohorteId).populate('user_id')
    .then(cohorte => res.json(cohorte))
    .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/').post((req, res) => {
  const newCohorte = new Cohorte(req.body)
  newCohorte.save()
    .then(cohorte => res.json(cohorte))
    .catch(err => res.status(400).json("Error! " + err))
})

router.route('/:cohorteId').delete((req, res) => {
  Cohorte.deleteOne({ _id: req.params.cohorteId })
    .then(cohorte => res.json('Success! cohorte deleted.'))
    .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/:cohorteId').put((req, res) => {
  Cohorte.findByIdAndUpdate(req.params.cohorteId, req.body)
    .then(cohorte => res.json('Success! cohorte updated.'))
    .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router