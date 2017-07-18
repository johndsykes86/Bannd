var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');
var businessController = require('../controllers/business.js');

var yelp = require('yelp-fusion');
var dotenv = require('dotenv').load()
var client = yelp.client(process.env.YELP_API_KEY)

function authenticateUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated()) return next();

  // Otherwise the request is always redirected to the home page
  res.redirect('/');
}

router.route('/')
  .get(staticsController.home);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route("/logout")
  .get(usersController.getLogout)

router.route("/secret")
  .get(authenticateUser, usersController.secret)

// Search on initial click of submit
router.route("/search/:searchTerm/:locationTerm")
  .get((req, res) => {
    console.log('searching');
    client.search({
      term: req.params.searchTerm,
      location: req.params.locationTerm
    }).then(response => {
      res.send(response.jsonBody)
    }).catch(e => {
      console.log(e);
    });
  })

// Page 1, 2, 3... of results
router.route("/search/:searchTerm/:page/:locationTerm")
  .get((req, res) => {
    console.log('here');
    console.log(req.params.offset);
    client.search({
      term: req.params.searchTerm,
      offset: 20 * (req.params.page -1),
      location: req.params.locationTerm
    }).then(response => {
      res.send(response.jsonBody)
    }).catch(e => {
      console.log(e);
    });
  })

// show each business




router.route('/show/:businessId')
.get((req, res) => {
  client.business(req.params.businessId).then(response => {
      console.log(response.jsonBody.name);
      res.render('show', {data: response.jsonBody})
    }).catch(e => {
      console.log(e);
    });
})

router.route('/show/:businessId').post(businessController.createBusiness)




module.exports = router
