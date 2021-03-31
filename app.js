const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

const exphbs = require('express-handlebars')
const router = require('./routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    eq: function (a, b) {
      return a === b
    }
  }
}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))


app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})