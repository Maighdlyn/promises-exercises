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
  return ASQ(function (done) {
    fakeAjax(file, done)
  })
}

// request an array of files at once in 'parallel'

getFile('file1')
.val(output)
.seq(getFile('file2'))
.val(output)
.seq(getFile('file3'))
.val(output)
.val(function () {
  output('Complete!')
})
