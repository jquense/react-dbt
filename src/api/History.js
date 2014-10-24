var _ = require('lodash')
  , Clank = require('clank')
  , Resource = require('miniature')
  , yup = require('yup')


  var HistoryItem = yup.object({
    date: yup.date(),
    started: yup.boolean().default(false)
  })

  module.exports = Resource.create({

    idField: 'date',

    url: 'api/diary',

    schema: yup.object({
      _id:  yup.string().nullable(),

      date: yup.date(),
      days: yup.array().of(HistoryItem)
    }),

    sync: require('../util/sync')
  })