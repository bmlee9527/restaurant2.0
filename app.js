const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const restaurants = require('./models/seeds/restaurant.json')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')

const exphbs = require('express-handlebars')
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

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = req.params.restaurant_id.toString()
  const restaurantInfo = restaurants.results.find(rest => rest.id.toString() === restaurant)
  res.render('show', { restaurant: restaurantInfo })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLocaleLowerCase()
  const restaurantfilter = restaurants.results.filter(r => r.name.toLocaleLowerCase().includes(keyword))
  console.log(restaurantfilter)
  res.render('index', { restaurants: restaurantfilter, keyword: keyword })
})

app.post('/restaurants', (req, res) => {
  const restaurantIofo = req.body
  return Restaurant.create({ name: restaurantIofo.name, name_en: restaurantIofo.name_en, categroy: restaurantIofo.categroy, image: restaurantIofo.image, location: restaurantIofo.location, phone: restaurantIofo.phone, google_map: restaurantIofo.google_map, rating: restaurantIofo.rating, description: restaurantIofo.description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
  console.log(restaurantIofo)
})


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})