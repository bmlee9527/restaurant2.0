const Restaurant = require('../restaurant')
const restList = require('./restaurant.json')

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < restList.results.length; i++) {
    Restaurant.create({
      name: restList.results[i].name,
      name_en: restList.results[i].name_en,
      category: restList.results[i].category,
      image: restList.results[i].image,
      location: restList.results[i].location,
      phone: restList.results[i].phone,
      google_map: restList.results[i].google_map,
      rating: restList.results[i].rating,
      description: restList.results[i].description
    })
  }
  console.log('done')
})

