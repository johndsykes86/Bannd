var searchSubmit = $('#search-submit')
var searchText = $('#search-text')
var locationText = $('#location-text')
var display = $('.display')
var businessShow = $('#business-link')
var pageList = $('.page-list')
var page;
var thispage;
var searchForm = $('#search-form')

yelpData = ''


searchForm.on('submit', (e) => {
  e.preventDefault()
  console.log('click');

  var rs = {
    method: 'get',
    url: '/search/' + searchText.val() + '/' + locationText.val()
  }

  function cb(d) {
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
          var eachBusiness = $('<div class="col-sm-6 col-md-4" id="each-business"></div>')
          var thumbnail = $('<div class="thumbnail"></div>')
          var aName = $('<a id="business-link">')
          var businessImg = $('<img src="'+result.image_url+'" class="img-thumbnail" style="height: 200px;  display: block;">')
          var liAddress1 = $('<li>')
          var cityStateZip = $('<li>')

          aName.attr('href', `/show/${result.id}`)
          aName.html(result.name)

          liAddress1.html(result.location.address1)
          cityStateZip.html(`${result.location.city}, ${result.location.state} ${result.location.zip_code}`)

          thumbnail.append(businessImg, aName, liAddress1, cityStateZip)
          eachBusiness.append(thumbnail)
          display.append(eachBusiness)
        })
        yelpData = d
      }
      $.ajax(rs).done(cb)
    })

    d.businesses.forEach((result) => {
      console.log(result.image_url);
      var eachBusiness = $('<div class="col-sm-6 col-md-4" id="each-business"></div>')
      var thumbnail = $('<div class="thumbnail"></div>')
      var aName = $('<a id="business-link">')
      var businessImg = $('<img src="'+result.image_url+'" class="img-thumbnail" style="height: 200px;  display: block;">')
      var liAddress1 = $('<li>')
      var cityStateZip = $('<li>')

      aName.attr('href', `/show/${result.id}`)
      aName.html(result.name)

      liAddress1.html(result.location.address1)
      cityStateZip.html(`${result.location.city}, ${result.location.state} ${result.location.zip_code}`)

      thumbnail.append(businessImg, aName, liAddress1, cityStateZip)
      eachBusiness.append(thumbnail)
      display.append(eachBusiness)
    })
    yelpData = d
  }
  $.ajax(rs).done(cb)
})

if (document.getElementsByClassName('edit-comment')[0]) {
  $('.form').hide()
}


$('.edit-comment').on('click', function(){
  var id = $(this).attr('id')
  var titleText = $(`#title-${id}`).text()
  var bodyText = $(`#body-${id}`).text()
  var form = $('.form')
  var title = $('.title')
  var body = $('.body')
  var submit = $('.submit')
  var postUrl = form.attr('action')
  form.show()

  title.attr('value', titleText)
  body.text(bodyText)
  submit.attr('value', 'Edit Story')
  form.attr('action', `${postUrl}/${$(this).parents().attr('id')}`)
})

$('.delete-comment').on("click", function(){
  $('.form').show()
  businessId = ($('h2').attr('id'))
  commentId= $(this).parent().parent().attr('id')
  $.ajax({url:`/show/${businessId}/comment/${commentId}/x`, method: "post"})
})
