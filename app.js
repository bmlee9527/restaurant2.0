const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const restaurants = require('./models/seeds/restaurant.json')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')

const exphbs = require('express-handlebars')
const restaurant = require('./models/restaurant')
//const { request } = require('express')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.urlencoded({ extended: true }))

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurant/new', (req, res) => {
  return res.render('new')
})

app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurant/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLocaleLowerCase()
  const restaurantfilter = restaurants.results.filter(r => r.name.toLocaleLowerCase().includes(keyword))
  console.log(restaurantfilter)
  res.render('index', { restaurants: restaurantfilter, keyword: keyword })
})

app.post('/restaurants', (req, res) => {
  const restaurantIofo = req.body
  return Restaurant.create({ name: restaurantIofo.name, name_en: restaurantIofo.name_en, category: restaurantIofo.category, image: restaurantIofo.image, location: restaurantIofo.location, phone: restaurantIofo.phone, google_map: restaurantIofo.google_map, rating: restaurantIofo.rating, description: restaurantIofo.description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
  console.log(restaurantIofo)
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const restaurantIofo = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = restaurantIofo.name, restaurant.name_en = restaurantIofo.name_en, restaurant.category = restaurantIofo.category, restaurant.image = restaurantIofo.image, restaurant.location = restaurantIofo.location, restaurant.phone = restaurantIofo.phone, restaurant.google_map = restaurantIofo.google_map, restaurant.rating = restaurantIofo.rating, restaurant.description = restaurantIofo.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})