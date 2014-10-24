'use strict';
var Store = require('./BaseStore')
  //, _ = require('lodash')
  , api = require('../api/api')


  module.exports = Store.extend({

    initialize: function(){
      var self = this;

      api.History.all().then(function(data){
        self._set({ histories: data })
      })
    }
  })