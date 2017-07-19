var yelp = require('yelp-fusion');
var dotenv = require('dotenv').load()
var client = yelp.client(process.env.YELP_API_KEY)

// const Business = require('../models/Business');


function createBusiness(req, res){
}



module.exports = {
  createBusiness: createBusiness
}
