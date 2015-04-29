wga
=========

wga is a small JS function which can wrap a generator or async
function to used as request handlers and middlewares in Express.
wga.js brought modern async write style to Express


Installing
----------
```sh
npm install wga --save
```

Using with generator
-----
```javascript
var wga = require("wga")
var app = require("express")()

app.get("/books", wga(function*(req, res, next) {
  var books = yield Book.findAll()
  res.send(books)
}))
```

In the above example, the thrown error will be passed to `next`, which in
Express's case calls the error handling middleware later on. If the generator succeeds, the `next` callback will not be called.

If you need to, like in middleware handlers, you can always call `next` yourself:

```javascript
app.use(wga(function*(req, res, next) {
  var user = yield User.find(req.session.userId)
  if (user == null) return next(new Error("Unauthorized"))
  req.user = user
  next()
}))
```


Using with async function
---------
```javascript
app.use(wga(async function(req, res, next) {
  var user = await User.find(req.session.userId)
  if (user == null) return next(new Error("Unauthorized"))
  req.user = user
  next()
}))

app.get('/', wga(async function (req, res) {
  let result = await Promise.resolve('Hello world')
  res.send(`${result}\n`)
}))
```


License
-------
MIT