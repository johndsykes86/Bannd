const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  yelpID: {type: String, required: true}
  name: {type: String, required: true},
  address: {type: String, required: true},

})


const User = mongoose.model('Business', businessSchema)
