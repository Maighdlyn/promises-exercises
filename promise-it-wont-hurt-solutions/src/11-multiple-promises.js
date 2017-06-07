'use strict';

function all(promise1, promise2){
  return new Promise(function(fulfill, reject){
    var counter = 0
    var array = []

    promise1.then(function(something){
      array[0] = something
      counter += 1

      if(counter >= 2){
        fulfill(array)
      }
    })

    promise2.then(function(thing){
      array[1] = thing
      counter +=1

      if(counter >=2){
        fulfill(array)
      }
    })
  })
}

all(getPromise1(), getPromise2()).then(console.log);
