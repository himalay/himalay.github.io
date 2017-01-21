// Search by post title/tags/categies
document.addEventListener('DOMContentLoaded', function () {
  var searchData = []
  var searchBtnEl = document.querySelector('#search-btn')
  var searchInputEl = document.querySelector('#search-input')
  var searchResultEl = document.querySelector('#search-results')
  var closeBtnEl = document.querySelector('#search-close')

  if (!searchData.length) {
    atomic.get('/search.json')
    .success(function (data, xhr) {
      searchData = data
    })
    .error(function (data, xhr) {
      console.error(data)
    })
    .always(function (data, xhr) {

    })
  }

  searchBtnEl.addEventListener('click', toggleHidden)
  searchInputEl.addEventListener('input', searchInputKeyupHandler)
  closeBtnEl.addEventListener('click', toggleHidden)

  function searchInputKeyupHandler (e) {
    var searchTxt = e.target.value.toLowerCase()
    searchResultEl.innerHTML = ''

    if (searchTxt.length > 1) {
      searchData.map(function (post, i) {
        var searchableTxt = post.title + post.categories + post.tags
        if (searchableTxt.toLowerCase().indexOf(searchTxt) !== -1) {
          var regExStr = searchTxt.split('').map(getUpAndLowChar).join().replace(/,/g, '')
          var regEx = new RegExp(regExStr)
          var title = post.title.replace(regEx, '<span class="black">$&</span>')
          searchResultEl.innerHTML += (
          searchResultEl.innerHTML === '' ? '' : '<span class="punctuation">, </span>'
        ) + '<span class="punctuation">{</span>' +
          '<div class="obj-pros"><div>' +
          '<span class="key">title</span><span class="punctuation">: </span>' +
          '<h2 class="value"><a href="' + post.url + '">' + title +
          '</a></h2>' + '<span class="punctuation">,</span></div><div>' +
          '<span class="key">date</span><span class="punctuation">: </span>' +
          '<time datetime="' + post.date + '" class="value">' +
          post.shortdate + '</time>' +
          '</div></div><span class="punctuation">}</span>'
        }
      })
    } else if (searchTxt.length === 0) {
      clearSearch()
    }
  }

  function toggleHidden () {
    document.querySelector('.search-container').classList.toggle('hidden')
    clearSearch()
  }

  function getUpAndLowChar (char) {
    return '[' + char + char.toUpperCase() + ']'
  }

  function clearSearch () {
    searchInputEl.value = ''
    searchResultEl.innerHTML = ''
  }
})

window.onresize = function () {
  var postFigure = document.querySelector('#postFigure')
  if (postFigure) {
    var documentWidth = document.documentElement.clientWidth
    postFigure.style.height = (documentWidth < 600 ? documentWidth : documentWidth - 64) / 3 + 'px'
  }
}

function scrollToArticle () {
  var headerHeight = parseInt(getComputedStyle(document.querySelector('header')).height) + 32
  var i = 0
  var it = setInterval(function () {
    i += 5
    window.scrollTo(0, i)
    if (i >= headerHeight) clearInterval(it)
  }, 5)
}
