var React = require('react')
  , Router = require('react-router')
  , im = require('./util/immutable')
  , Dispatcher = require('boutique').Dispatcher.create();
  // , IOC = new require('di-container')
  // , container = new IOC();

global.App = {}
App.historyStore = new (require('./stores/HistoryStore'))(Dispatcher)
App.diaryStore = new (require('./stores/DiaryStore'))(Dispatcher)

App.diaryActions = require('./actions/diary')
App.diaryActions.dispatcher = Dispatcher

require('../styles/site.less')

//var apiService = new ApiService(location.origin, '/auth')
var HistoryViewController = require('./components/History.jsx')

//apiService.authenticate();

React.renderComponent((
  <Router.Routes location="history">
    <Router.Route name="history" handler={HistoryViewController}/>
    <Router.Route name="diary" path='/diary/:date/day/:day' handler={require('./components/Diary.jsx')}>

    </Router.Route>
    <Router.DefaultRoute handler={HistoryViewController}/>
  </Router.Routes>
), document.body);

      // <Router.Route name="day" path='day/:date' handler={}/>