var co = require("co")

module.exports = function next(fn) {
  // Special casing arity 4 to get Express to recognize it as an error handling
  // middleware.
  if (fn.length == 4) return function(err, req, res, next) {
    return co(fn.call(this, err, req, res, next)).catch(next)
  }

  return function() {
    return co(fn.apply(this, arguments)).catch(arguments[arguments.length - 1])
  }
}