const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const restaurants = require('./restaurant.json')

const restaurantList = require('./restaurant.json')

const exphbs = require('express-handlebars')
//const { request } = require('express')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

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
  res.render('index', { restaurants: restaurants.results })
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


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})