'use strict';
var Boutique = require('boutique')
  , Clank = require('clank')
  , _ = require('lodash')
  , immutable = require('../util/immutable')


module.exports = Boutique.Store.extend({

  constructor: function BaseStore(dispatcher){
    var self = this;

    Boutique.Store.call(this, dispatcher)

    this.state = immutable(this.state)

    this.stores = _.transform(this.needs, function(obj, type){
      obj[type] = self.container.resolve('store:' + type)
    }, {})

    this.initialize && this.initialize()
  },

  _set: function(path, value){
    var data;

    if( arguments.length === 1)
      value = path, path = '';

    this.state = path
      ? this.state.setIn(path, immutable(value))
      : immutable(value)

    this._schedule(this.emitChange)
  },

  _merge: function(obj){
    return this._set(this.state.merge(obj))
  },

  _mergeDeep: function(obj){
    return this._set(this.state.mergeDeep(obj))
  },

  _get: function(path){
    return path ? this.state.getIn(path) : this.state
  },

  get: function(path){
    var val = this._get(path)
    return (val && val.toJS) ? val.toJS() : val
  }

})


module.exports.setCompositionStrategy({
  needs: Clank.concat()
})