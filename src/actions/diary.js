var ActionCreator = require('boutique').ActionCreator
  , action = ActionCreator.action
  , api = require('../api/api');

module.exports = ActionCreator.create({

  fetchDiary: action('Diary:Fetch', function(id, send){
    api.Diary.get(id).then(function(d){ send(d) })
  }),

  updateDay: action('Diary:UpdateDay'),

  save: action('Diary:Save', function(diary, send){
    var self = this;

    if ( api.Diary.isValid(diary))
      api.Diary.save(diary).then(function(d) {
        self.send('Diary:SaveComplete', d)
      })
  }),

  delete: action('Diary:Delete')

})




