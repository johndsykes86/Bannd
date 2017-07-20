var passport = require("passport")

// GET /signup
function getSignup(request, response) {
  response.render('authentication/signup.ejs', {message: request.flash('signupMessage')})
}

// POST /signup
function postSignup(request, response) {
  console.log(response.req.body);
  var signupStrategy = passport.authenticate(
    'local-signup', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true
    }
  )

  return signupStrategy(request, response);
}

// GET /login
function getLogin(request, response) {
  response.render('authentication/login.ejs', {message: request.flash('loginMessage')})
}

// POST /login
function postLogin(request, response) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  })

  return loginProperty(request, response)
}

// GET /logout
function getLogout(request, response) {
  request.logout();
  response.redirect('/');
}

// Restricted page
function secret(request, response){
  response.render('secret.ejs')
}

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  secret: secret
}
