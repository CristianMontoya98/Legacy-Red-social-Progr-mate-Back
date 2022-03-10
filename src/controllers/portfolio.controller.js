// profile controller
const Portfolio = require('../models/portfolio.model');
const router = require('express').Router();



router.route('/').get((req, res) => {
  Portfolio.find()
    .then(allPortfolio => res.json(allPortfolio))
    .catch(err => res.status(400).json('Error! ' + err))
})
router.route('/:portfolioId').get((req, res) => {
  Portfolio.findById(req.params.portfolioId)
    .then(portfolio => res.json(portfolio))
    .catch(err => res.status(400).json('Error! ' + err))
})
router.route('/').post((req, res) => {
  const newPost = new Portfolio(req.body)

  newPost.save()
    .then(portfolio => res.json(portfolio))
    .catch(err => res.status(400).json("Error! " + err))
})
router.route('/:portfolioId').delete((req, res) => {
  Portfolio.deleteOne({ _id: req.params.portfolioId })
    .then(portfolio => res.json('Success! Portfolio deleted.'))
    .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/:portfolioId').put((req, res) => {
  Portfolio.findByIdAndUpdate(req.params.portfolioId, req.body)
    .then(portfolio => res.json('Success! Portfolio updated.'))
    .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router