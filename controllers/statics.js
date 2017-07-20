// GET /
function home(req, res) {
  if (user){
    res.render('index.ejs');
  } else {
    res.redirect('/login')
  }

}

function landing(req, res) {
  if (!user){
    res.render('landing.ejs', {layout: 'landing'})
  } else {
    res.redirect('/home')
  }

}

module.exports = {
  home: home,
  landing: landing,
}
