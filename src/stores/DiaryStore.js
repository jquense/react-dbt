'use strict';
var Store = require('./BaseStore')
  , _ = require('lodash')
  , date = require('../util/locale').dates
  , api  = require('../api/api')


  module.exports = Store.extend({

    getInitialState: function(){
      return {
        days: [],
        currentDay: 0
      }
    },

    actions: [

      Store.listenFor('Diary:Fetch', function(diary){
        if ( date.eq(diary.date, this._get('date'), 'day'))
          return

        this._set(diary)
        this._set('currentDay', date.weekday(diary.date))
      }),

      Store.listenFor('Diary:UpdateDay', function(day){
        var idx;

        this._get('days').find(function(d, i){
          if(date.eq(day.date, d.get('date'), 'day'))
            return idx = i, true
        })

        if(idx !== -1) {
          day.started = true
          this._set(['days', idx], day)
        }
      }),

      Store.listenFor('Diary:Save', 'Diary:SaveComplete', function(diary){
        this._mergeDeep(diary)
      })

    ],


  })