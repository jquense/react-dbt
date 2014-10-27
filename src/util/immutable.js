'use strict';
var im = require('immutable')
  , _ = require('lodash')

var SPLIT_REGEX = /[^.^\]^[]+|(?=\[\]|\.\.)/g
  , STRIP_WHITESPACE = /^['|"]|['|"]$/g

module.exports = Immutable

function Immutable(obj){
  return im.fromJS(obj)
}

_.extend(Immutable, im)

_.each(['getIn', 'setIn', 'updateIn'], function(method){
  var mapBase = im.Map.prototype[method]
    , vecBase = im.Vector.prototype[method]

  im.Map.prototype[method] = function(...args){
    args[0] = splitPath(args[0])
    return mapBase.apply(this, args)
  }

  im.Vector.prototype[method] = function(...args){
    args[0] = splitPath(args[0])
    return vecBase.apply(this, args)
  }

})

function splitPath(path){
  if(typeof path === 'string')
    path = _.map(path.match(SPLIT_REGEX)
              , m => m.replace(STRIP_WHITESPACE, ''))

  return path
}