var mongoose = require("mongoose")
var router = express.Router();

const comments = require('../models/comments')

// COMMENTS


// All of comments from a business
  function commentIndex (req, res) {
    app.get('/businesses/:id/comments/:comment',
    (req, res) => {
      Business.find({yelpID:req.params.businessId}), (err, business) => {
        var comment = business.comments(req.params.comment_id)
        res.send(song)
      }
    })
  }


  function createComment(req, res) {
    app.post('/comments', (req, res) => {
      Comment.create(req,body (err, album =>{
      if(err) return console.log(err)
      res.json(comment)
    })
  })
}
