const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  _by: {type:mongoose.Schema.Types.ObjectId, ref: 'userSchema'}
})

module.exports = mongoose.model('Comment', commentSchema)
