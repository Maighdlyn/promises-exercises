'use strict'

function all (promise1, promise2) {
  return new Promise(function (resolve, reject) {
    var counter = 0
    var array = []

    promise1.then(function (something) {
      array[0] = something
      counter += 1

      if (counter >= 2) {
        resolve(array)
      }
    })

    promise2.then(function (thing) {
      array[1] = thing
      counter += 1

      if (counter >= 2) {
        resolve(array)
      }
    })
  })
}

// getPromise1() and getPromise2() are definted within the nodeschool tutorial environment
all(getPromise1(), getPromise2())
  .then(console.log)
