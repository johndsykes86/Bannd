var yelp = require('yelp-fusion');
var dotenv = require('dotenv').load()
var client = yelp.client(process.env.YELP_API_KEY)

const Business = require('../models/Business');


function createBusiness(req, res){
  client.business(req.params.businessId).then(response => {
    Business.create({
      yelpID: response.jsonBody.id,
      name: response.jsonBody.name,
      address: response.jsonBody.name,
      img_url: response.jsonBody.image_url
    })
})
}


module.exports = {
  createBusiness: createBusiness
}
