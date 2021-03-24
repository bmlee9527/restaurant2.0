const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const regex = new RegExp(escapeRegex(req.query.keyword), 'gi')
  return Restaurant.find({ name: regex })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
  }
})

module.exports = router