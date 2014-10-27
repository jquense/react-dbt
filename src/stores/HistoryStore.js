'use strict';
var Store = require('./BaseStore')
  , api = require('../api/api')


  module.exports = Store.extend({

    initialize: function(){
      var self = this;

      api.History.all().then(function(data){
        self._set({ histories: data })
      })
    },

    actions: []
  })