var _ = require('lodash')
  , Clank = require('clank')
  , Resource = require('miniature')
  , yup = require('yup')

var Range = yup.number().min(0).max(5).default(0)

var Specify = yup.object({
  times:   yup.number().default(0),
  specify: yup.string()
});

var BeforeAfter = yup.object({
  before: yup.number().min(0).max(5),
  after:  yup.number().min(0).max(5),
});

var Day = yup.object({
  started:     yup.boolean().default(false),
  date:        yup.date(),
  firstOfWeek: yup.date(),

  dayOfWeek: yup.number().min(0).max(7),
  week:      yup.number().min(1).max(52),
  year:      yup.number(),

  use:       Range,
  suicide:   Range,
  selfHarm:  Range,
  pain:      Range,
  sadness:   Range,
  shame:     Range,
  anger:     Range,
  fear:      Range,

  urgeToUse:         BeforeAfter,
  urgeToQuit:        BeforeAfter,
  urgeToHarm:        BeforeAfter,

  beliefInEmotions:  BeforeAfter,
  beliefInBehaviors: BeforeAfter,
  beliefInThoughts:  BeforeAfter,

  illicit:           Specify,
  otc:               Specify,
  prescription:      Specify,
  alcohol:           Specify,

  causedSelfHarm:    yup.boolean(),
  lying:             yup.number(),
  joy:               Range,
  skills:            yup.number().min(0).max(7).default(0)

})


module.exports = Resource.create({

  idField: 'date',

  url: function(context){
    return 'api/diary/' + (context.date ? context.date.toISOString() : '')
  },

  schema: yup.object({
    date: yup.date(),
    days: yup.array().of(Day)
  }),

  sync: require('../util/sync')
})