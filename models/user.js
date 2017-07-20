var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var User = mongoose.Schema({
  local : {
    email        : String,
    password     : String,
  },
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  userName: {type: String, required: true},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});



User.methods.encrypt = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);
