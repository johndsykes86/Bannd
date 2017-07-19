var searchSubmit = $('#search-submit')
var searchText = $('#search-text')
var locationText = $('#location-text')
var display = $('.display')
var businessShow = $('#business-link')
var pageList = $('.page-list')
var page;
var thispage;



yelpData = ''


searchSubmit.on('click', () => {
  console.log('click');

  var rs = {
    method: 'get',
    url: '/search/' + searchText.val() + '/' + locationText.val()
  }

  function cb(d) {
    // console.log(d + '#################');
    display.empty()
    pageList.empty()
    var pageNum = 50
    if(Math.floor(d.total / 20) > pageNum) {
      pageNum = 50
    } else {
      pageNum = Math.floor(d.total / 20)
    }
    for(i = 1; i <= pageNum; i++) {
      pageList.append('<a class="page" href="#">' +i+ '</a> <a> </a> ')
    }
    page = $('.page')
    page.click(function(){

      console.log($(this))
      thispage = $(this)
      var rs = {
        method: 'get',
        url: '/search/' + searchText.val() + '/' + $(this).text() + '/' + locationText.val()
      }

      function cb(d) {
        console.log(d);
        display.empty()
        d.businesses.forEach((result) => {
          var aName = $('<a id="business-link">')
          aName.attr('href', `/show/${result.id}`)
          aName.html(result.name)
          display.append(aName)


          var liAddress = $('<li>')
          liAddress.html(result.location.address1)
          display.append(liAddress)

          var comment = $('<textarea>')
          comment.attr('rows', 4)
          comment.attr('columns', 50)
          display.append(comment)
        })
        yelpData = d
      }

      $.ajax(rs).done(cb)
    })


    d.businesses.forEach((result) => {
      console.log(result);
      var aName = $('<a id="business-link">')
      aName.attr('href', `/show/${result.id}`)
      aName.html(result.name)
      display.append(aName)


      var liAddress = $('<li>')
      liAddress.html(result.location.address1)
      display.append(liAddress)

      var comment = $('<textarea>')
      comment.attr('rows', 4)
      comment.attr('columns', 50)
      display.append(comment)
    })
    yelpData = d
  }

  $.ajax(rs).done(cb)
})

$('.edit-comment').on('click', function(){
  var id = $(this).attr('id')
  var titleText = $(`#title-${id}`).text()
  var bodyText = $(`#body-${id}`).text()
  var form = $('.form')
  var title = $('.title')
  var body = $('.body')
  var submit = $('.submit')
  var postUrl = form.attr('action')


  form.attr('method', 'patch')
  title.attr('value', titleText)
  body.text(bodyText)
  submit.attr('value', 'Edit Story')
  form.attr('action', `${postUrl}/${$('.each-comment').attr('id')}`)

})
