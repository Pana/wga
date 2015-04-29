var co = require("co")

module.exports = function(fn) {
    return isGeneratorFunction(fn) ? gWrapper(fn) : aWrapper(fn)
}

/*
 *   generator wrapper
 */
function gWrapper(fn) {
    if (fn.length == 4) return function(err, req, res, next) {
        return co(fn.call(this, err, req, res, next)).catch(next)
    }
    return function() {
        return co(fn.apply(this, arguments)).catch(arguments[arguments.length - 1])
    }
}

/*
 *   async wrapper
 */
function aWrapper(fn) {
    if (fn.length == 4) return function(err, req, res, next) {
        return fn.call(this, err, req, res, next).catch(next)
    }
    return function() {
        return fn.apply(this, arguments).catch(arguments[arguments.length - 1])
    }
}



/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
function isGenerator(obj) {
    return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
function isGeneratorFunction(obj) {
    var constructor = obj.constructor;
    if (!constructor) return false;
    if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
    return isGenerator(constructor.prototype);
}
