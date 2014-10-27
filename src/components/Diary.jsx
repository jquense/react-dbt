var React  = require('react/addons')
  , locale = require('../util/locale')
  , date 	 = locale.dates
  , bs = require('react-bootstrap')
  , Link = require('react-router').Link
  , Day = require('./Day.jsx')
  , DatePicker = require('react-widgets').DateTimePicker
  , _ = require('lodash');

var cx = React.addons.classSet;

module.exports = Diary = React.createClass({

	mixins: [
		 require('react-router').Navigation
	],

	statics: {
    willTransitionTo: function(transition, params) {
    	App.diaryActions.fetchDiary(date.parse(params.date, 'yyyy-MM-dd'))
    },
  },

	_onStoreChange: function(){
		this.setState(this.getStoreState())
	},

	componentWillMount: function() {
		App.diaryStore.listen(this._onStoreChange)
	},

	componentDidUnmount: function() {
		App.diaryStore.stopListening(this._onStoreChange)
	},

	getStoreState: function(){
		return App.diaryStore.get() || {}
	},

	getInitialState: function() {
		return _.extend(this.getStoreState());
	},

	render: function() {
		var state = this.state
		  , saving = !!this.state.saving
		  , saveText   = !saving ? 'Save and continue later' : 'saving..'
		  , submitText = !saving ? 'Submit Diary' : 'saving..'

		  , current = _.find(this.state.days
					, day => date.format(day.date, 'eee') === this.props.params.day)

		return (
			<div>
			  <nav className="navbar navbar-default">
			    <div className="container">
			      <div className="navbar-header navbar-left">
	            <Link to='history' className='navbar-text'>
              	<i className="fa fa-arrow-left"/> Back
              </Link>
			      </div>
			      <div className='navbar-right'>
			      	<div className="navbar-form">
		            <span className="static-text">Week of the: </span>
		            <DatePicker
		            	className="week-picker"
		            	style={{display: 'inline-block'}}
	            		defaultValue={date.parse(this.props.params.date, 'yyyy-MM-dd')}
                  format="MMM dd"/>
		          </div>
			      </div>
			    </div>
			  </nav>

				<div className="top-bar scrolling-pills">
				  <div className="container">
				    <bs.Nav bsStyle='pills'
				    	justified={true}
				    	activeKey={this.props.params.day}
				    	onSelect={this._selectTab}>
				    	{_.map(state.days, day => (
				  				<bs.NavItem
					  				key={date.format(day.date, 'eee')}
					  				className={cx({'nav-success': day.submitted })}>
					  				{	date.format(day.date, 'eeee') + ' '}
				  					{ day.started &&
				  						<i className="fa fa-pencil"></i>
				  					}
				  				</bs.NavItem>))}
				    </bs.Nav>
				  </div>
				</div>
				<div className="container">
					<Day day={current}/>
				</div>
				<nav className="navbar navbar-default navbar-fixed-bottom" role="navigation">
				  <div className="container">
				    <div className="navbar-form navbar-right">
				      {!state.submitted &&
				      	<bs.Button bsStyle="default" disabled={saving} onClick={this.save}>
				      		{saveText}
				      	</bs.Button>
				      }
				      {!state.submitted && <bs.Button bsStyle="success" disabled={saving}>{submitText}</bs.Button>}
				      { state.submitted && <bs.Button bsStyle="warning" disabled={saving}>Unsubmit</bs.Button>}
				    </div>
				    <div className="message-area navbar-right"></div>
				  </div>
				</nav>
			</div>
		);
	},

	save: function(){
		App.diaryActions.save(this.state)
	},

	_selectTab: function(day){
		this.replaceWith(this.props.name, { date: this.props.params.date, day: day})
	},

	_setter: function(key){
		return _.bind(function(val){
			var state = {}; state[key] = val;

			if(this.state[key] !== val) this.setState(state)
		}, this)
	}
});
