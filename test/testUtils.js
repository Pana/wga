'use strict'
let Promise = require('bluebird')

exports.asyncTaskGood = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, 1000, 'Hello World')
  })
}

exports.asyncTaskBad = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(reject, 1000, new Error('oh no!'))
  })
}