var ajax = require('component-ajax')
  , Promise = require('bluebird')
  , AjaxError = require('../errors/AjaxError')
  , CancellationError = require('../errors/CancellationError')

module.exports = function(options){
  var success = options.success
    , error = options.error
    , promise, xhr;

  promise = new Promise(function(resolve, reject) {

    options.error = function onAjaxError( xhr, textStatus, errorThrown){
      var msg = textStatus + errorThrown ? (' : ' + errorThrown) : ''

      if (error)
        error.call(this, xhr, textStatus, errorThrown)

      reject(textStatus === 'abort'
        ? new CancellationError(msg)
        : new AjaxError(xhr.status, textStatus, xhr))
    }

    options.success = function onAjaxSuccess(data, textStatus, xhr){
      if (success) success.call(this, data, textStatus, xhr)
      resolve(data)
    }

    xhr = ajax(options)
  })

  promise.abort = function(){ xhr.abort() }

  return promise
}