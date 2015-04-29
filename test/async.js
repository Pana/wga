import express from 'express'
import testUtils from './testUtils'
import wrapper from '../index'

let app = express()

// let wrap = fn => (...args) => fn(...args).catch(args[2])

app.get('/', wrapper(async (req, res) => {
  let result = await testUtils.asyncTaskGood()
  res.write(`${result}\n`)
  await testUtils.asyncTaskBad()
  res.write('will not make it here')
}))

app.use(function (er, req, res, next) {
  res.end(er.message)
})

app.listen(3000)
console.log('Server listen at 3000')

// output from http://localhost:3000

// Hello World
// oh no!