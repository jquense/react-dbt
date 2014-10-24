var React = require('react')
  , HistoryItem = require('./HistoryItem.jsx')
  , _ = require('lodash');


module.exports = Library = React.createClass({

	_onStoreChange: function(){
		this.setState(
			this.getStoreState())
	},

	componentWillMount: function() {
		App.historyStore.listen(this._onStoreChange)
	},

	componentWillUpdate: function(nextProps, nextState) {
		App.historyStore.stopListening(this._onStoreChange)
	},

	getInitialState: function() { return {} },

	render: function() {

		var Weeks = _.map(this.state.weeks || [], (val, key) => {
		  		var items = _.map(this.state.weeks
		  					, (val, i) => HistoryItem(_.extend({ key: i }, val), null) )

		  		return (
	    			<li key={key}>
		        		<h2 className="page-header">{key}</h2>
		        		<ul style={{listStyle: 'none'}} className="list-inline">{items}</ul>
	        		</li>
	    		)
			})

		return (
		  	<div className="container">
		  		<div className="navbar navbar-default">
				      <div className="container">
				        <div className="navbar-header">
				          <span className="navbar-brand">Welcome</span>
				        </div>
				    </div>
			  	</div>
			  	<ul className="diaries list-unstyled container">
				    {Weeks}
			    </ul>
		    </div>
		);
	},

	getStoreState: function(){
		return {
			weeks: App.historyStore.state.histories
		}
	},

});
