function fakeAjax (url, cb) {
  var fakeResponses = {
    'file1': 'The first text',
    'file2': 'The middle text',
    'file3': 'The last text'
  }
  var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000

  console.log('Requesting: ' + url)

  setTimeout(function () {
    cb(fakeResponses[url])
  }, randomDelay)
}

function output (text) {
  console.log(text)
}

// **************************************

function getFile (file) {
  var text, fn
  fakeAjax(file, function (response) {
    if (fn) {
      fn(response)
    } else {
      text = response
    }
  })
  return function (cb) {
    if (text) {
      cb(text)
    } else {
      fn = cb
    }
  }
}

var thunk1 = getFile('file1')
var thunk2 = getFile('file2')
var thunk3 = getFile('file3')

thunk1(function (text1) {
  output(text1)
  thunk2(function (text2) {
    output(text2)
    thunk3(function (text3) {
      output(text3)
      output('Complete!')
    })
  })
})

// request all files at once in 'parallel'
// ???
