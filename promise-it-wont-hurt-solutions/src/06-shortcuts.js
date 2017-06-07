'use strict'

var resolved = Promise.resolve('Promise fulfilled.')
var rejected = Promise.reject(new Error('Rejection.'))

function onReject (error) {
  console.log(error.message)
}

resolved.then(console.log)
rejected.catch(onReject)
