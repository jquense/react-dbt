var React = require('react')
  , Link = require('react-router').Link
  , DatePicker = require('react-widgets').DateTimePicker
  , _ = require('lodash');


module.exports = Diary = React.createClass({

	render: function() {
		return (
			<div>
			  <div className="navbar navbar-default navbar-static-top">
			    <div className="container">
			      <div className="navbar-header">
			          <div className=" pull-left">
			            <Link to='history'>
		              	<i className="fa fa-arrow-left"/> Back
		              </Link>
			          </div>
			          <div className="navbar-toolbar pull-right">
			            <span className="static-text">Week of the: </span>
			            <DatePicker
			            	className="week-picker"
		            		defaultValue={this.props.date}
	                  format="MMM dd"/>
			          </div>
			      </div>
			    </div>
			  </div>

				<div className="top-bar scrolling-pills">
				  <div className="container">
				    <ul className="nav nav-pills nav-justified"></ul>
				  </div>
				</div>
				<div className="pg-main container">
				  <div className="callout callout-info" >This Diary has already been submitted so you cannot change it</div>
				  <div className="tab-content">
				  </div>
				</div>

				<nav className="navbar navbar-default navbar-fixed-bottom" role="navigation">
				  <div className="container">
				    <div className="navbar-toolbar navbar-right">
				      <button className="btn btn-default btn-save">Save and continue later</button>
				      <button className="btn btn-success btn-submit">Submit Diary</button>
				      <button className="btn btn-warning btn-unsubmit">Unsubmit</button>
				    </div>
				    <div className="message-area navbar-right"></div>
				  </div>
				</nav>
			</div>
		);
	},

	getStoreState: function(){
		return {
			indexes: App.libraryStore.getIndexes() || null,
		}
	},

});
