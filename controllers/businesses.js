var yelp = require('yelp-fusion');
var dotenv = require('dotenv').load()
var client = yelp.client(process.env.YELP_API_KEY)

const Business = require('../models/Business');


function createBusiness(req, res){
  client.business(req.params.businessId).then(response => {
    if (!Business.find({yelpID:req.params.businessId})){
      Business.create({
        yelpID: response.jsonBody.id,
        name: response.jsonBody.name,
        address: response.jsonBody.name,
        img_url: response.jsonBody.image_url
      })
    } else {
      res.json({message: "The business already exists"})
    }

})
}


module.exports = {
  createBusiness: createBusiness
}
