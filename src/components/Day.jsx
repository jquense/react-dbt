var React = require('react')
  , Case = require('case')
  , RadioRange = require('./controls/RadioRange.jsx')
  , Specify = require('./controls/Specify.jsx');

var alt = {
	suicide: 'sucide ideation',
	use: 'misery',
	otc: 'Over the Counter Medications',
	prescription: 'Prescription Medications',
	illicit: 'Illicit Drugs'
}

module.exports = React.createClass({

	render: function() {
		var day = this.props.day || {};

		return (
		  	<div>
		  		<form className='form-horizontal'>
		  			<fieldset>
		  				<legend>Behaviors</legend>
		  				{_.map(['use', 'suicide', 'selfHarm']
		  					, field => (
		  						<div className="form-group">
						        <label className="control-label col-md-3 col-sm-4">{Case.title(alt[field] || field)}</label>
						        <div className="col-md-9 col-sm-8">
						          <RadioRange range={6}
						            name={field}
						            value={day[field]}
						            onChange={this._change.bind(null, field)}/>
						        </div>
						      </div>
	  						))}
		  			</fieldset>
		  			<fieldset>
		  				<legend>Behaviors</legend>
		  				{_.map(['pain', 'sadness', 'shame','anger','fear', 'joy']
		  					, field => (
		  						<div className="form-group">
						        <label className="control-label col-md-3 col-sm-4">{Case.title(alt[field] || field)}</label>
						        <div className="col-md-9 col-sm-8">
						          <RadioRange range={6}
						            name={field}
						            value={day[field]}
						            onChange={this._change.bind(null, field)}/>
						        </div>
						      </div>
	  						))}
	  				</fieldset>
	  				<fieldset>
		  				<legend>Urges</legend>
		  				{_.map(['alcohol', 'otc', 'prescription','illicit']
		  					, field => (
		  						<div className="form-group">
						        <label className="control-label col-md-3 col-sm-4">{Case.title(alt[field] || field)}</label>
						        <Specify className="col-md-9 col-sm-8"
						        	name={field}
					            value={day[field]}
					            onChange={this._change.bind(null, field)}/>
						      </div>
	  						))}
	  				</fieldset>
	  				<fieldset>
				        <legend>---</legend>
				        <div className="form-group">
				          <div className="col-md-9 col-sm-8 col-md-offset-3 col-sm-offset-4">
				            <label className="checkbox ">
				              <input type="checkbox" name="causedSelfHarm"
				              	checked={day.causedSelfHarm}
		                    onChange={this._change.bind(null, "causedSelfHarm", !day.causedSelfHarm)}/>
	                    Caused self-harm
                    </label>
				          </div>
				        </div>

				        <div className="form-group">
				            <label className="control-label col-md-3 col-sm-4">Skills</label>
				            <div className="col-md-9 col-sm-8">
				                <label className="radio">
				                    <input type="radio" name="skills"
					                    checked={day.skills === 0 }
					                    onChange={this._change.bind(null, "skills", 0)}/>
				                    Not thought about or used</label>
				                <label className="radio">
				                    <input type="radio" name="skills"
				                      checked={day.skills === 1 }
				                      onChange={this._change.bind(null, "skills", 1)}/>
				                    Thought about, not used, did not want too</label>
				                <label className="radio">
				                    <input type="radio" name="skills"
				                    	checked={day.skills === 2 }
				                      onChange={this._change.bind(null, "skills", 2)}/>
				                    Thought about, not used, wanted to</label>
				                <label className="radio">
				                    <input type="radio" name="skills"
				                    	checked={day.skills === 3 }
				                    	onChange={this._change.bind(null, "skills", 3)}/>
				                    Tried but could not use them</label>
				                <label className="radio">
				                    <input type="radio" name="skills"
				                    	checked={day.skills === 4 }
				                    	onChange={this._change.bind(null, "skills", 4)}/>
				                    Tried, could do them, but they didn't help</label>
				                <label className="radio">
				                    <input type="radio" name="skills"
				                    	checked={day.skills === 5 }
				                    	onChange={this._change.bind(null, "skills", 5)}/>
				                    Tried, could use them, helped</label>
				                <label className="radio">
				                    <input type="radio" name="skills"
				                    	checked={day.skills === 6 }
				                    	onChange={this._change.bind(null, "skills", 6)}/>
				                    Did not try, used them, did not help</label>
				                <label className="radio">
				                    <input type="radio" name="skills" value={7}
				                    	checked={day.skills === 7 }
				                    	onChange={this._change.bind(null, "skills", 7)}/>
				                    Did not try, used them, helped</label>
				            </div>
					    </div>
				    </fieldset>
		  		</form>
		  	</div>
		);
	},

	_change: function(field, value){
		var day = _.extend({}, this.props.day)

		day[field] = value;
		App.diaryActions.updateDay(day)
	},

	_setter: function(key){
		return _.bind(function(val){
			var state = {}; state[key] = val;
			if(this.state[key] !== val) this.setState(state)
		}, this)
	}

});
