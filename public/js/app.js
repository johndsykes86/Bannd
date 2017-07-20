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
          aName.attr('href', `/show/${result.id}`)
          aName.html(result.name)

          var liAddress = $('<li>')
          liAddress.html(result.location.address1)

          var comment = $('<textarea>')
          comment.attr('rows', 4)
          comment.attr('columns', 50)

          thumbnail.append(businessImg, aName, liAddress, liAddress)
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
      aName.attr('href', `/show/${result.id}`)
      aName.html(result.name)

      var liAddress = $('<li>')
      liAddress.html(result.location.address1)

      var comment = $('<textarea>')
      comment.attr('rows', 4)
      comment.attr('columns', 50)

      thumbnail.append(businessImg, aName, liAddress, liAddress)
      eachBusiness.append(thumbnail)
      display.append(eachBusiness)
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

  title.attr('value', titleText)
  body.text(bodyText)
  submit.attr('value', 'Edit Story')
  form.attr('action', `${postUrl}/${$('.each-comment').attr('id')}`)
})

$('.delete-comment').on("click", function(){
  businessId = ($('h2').attr('id'))
  commentId= $(this).parent().parent().attr('id')
  $.ajax({url:`/show/${businessId}/comment/${commentId}/x`, method: "post"})
})
