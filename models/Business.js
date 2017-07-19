const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  yelpID: {type: String, required: true},
  name: {type: String, required: true},
  address: {type: String, required: true},
  img_url: {type: String},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

businessSchema.pre("findOne", function () {
  this.populate("comments")
})

const Business = mongoose.model('Business', businessSchema)
module.exports = Business
