// GET /
function home(req, res) {
if (user){
  res.render('index.ejs');
} else {
  res.redirect('/login')
 }
}

function landing(req, res) {
  res.render('landing.ejs', {layout: 'landing'})
}

module.exports = {
  home: home,
  landing: landing,
}
