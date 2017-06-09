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
  return new Promise(function executor (resolve, reject) {
    fakeAjax(file, resolve)
  })
}

// request all files at once in 'parallel'

var promise1 = getFile('file1')
var promise2 = getFile('file2')
var promise3 = getFile('file3')

promise1
.then(output)
.then(function () {
  return promise2
})
.then(output)
.then(function () {
  return promise3
})
.then(output)
.then(function () {
  output('Complete!')
})
