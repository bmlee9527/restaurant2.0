const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')


router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const restaurantIofo = req.body
  return Restaurant.create({ name: restaurantIofo.name, name_en: restaurantIofo.name_en, category: restaurantIofo.category, image: restaurantIofo.image, location: restaurantIofo.location, phone: restaurantIofo.phone, google_map: restaurantIofo.google_map, rating: restaurantIofo.rating, description: restaurantIofo.description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const restaurantIofo = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = restaurantIofo.name, restaurant.name_en = restaurantIofo.name_en, restaurant.category = restaurantIofo.category, restaurant.image = restaurantIofo.image, restaurant.location = restaurantIofo.location, restaurant.phone = restaurantIofo.phone, restaurant.google_map = restaurantIofo.google_map, restaurant.rating = restaurantIofo.rating, restaurant.description = restaurantIofo.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  console.log('hi')
  res.redirect('/')
})

module.exports = router