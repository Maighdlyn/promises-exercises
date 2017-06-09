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
// The old-n-busted callback way

function getFile (file) {
  return new Promise(function (resolve) {
    fakeAjax(file, resolve)
  })
}

// Request all files at once in
// 'parallel' via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

['file1', 'file2', 'file3']
.map(getFile)
.reduce(function combine (chain, pr) {
  return chain.then(function () {
    return pr
  })
}, Promise.resolve())
.then(function () {
  output('Complete!')
})

Promise.resolve()
.then(function () {
  return promise1
})
.then(output)
.then(function () {
  return promise2
})
.then(output)
.then(function () {
  return promise3
})
.then(output)
