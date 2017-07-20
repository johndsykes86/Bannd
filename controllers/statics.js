// GET /
function home(req, res) {
  res.render('index.ejs');
}

function landing(req, res) {
  res.render('landing.ejs', {layout: 'landing'})
}

module.exports = {
  home: home,
  landing: landing,
}
