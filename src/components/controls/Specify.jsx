/**
 * @jsx React.DOM
 */

var React = require('react')
  , NumberPicker = require('react-widgets').NumberPicker;

var Specify = React.createClass({

  getDefaultProps: function(){
    return { value: {}}
  },

  render: function() {
    return this.transferPropsTo(
      <div>
          <NumberPicker className="form-occurances"
            onChange={this._change.bind(null, 'times')}
            value={this.props.value.times}
            format="d0"
            min={0}/>
          <span className="form-control-static"> Number of times</span>
          <textarea
            onChange={this._change.bind(null, 'specify')}
            value={this.props.value.specify}
            className="form-control input-padding"
            placeholder="optionally specify what happened..."/>
      </div>
    );
  },

  _change: function(field, value){
    var model = _.extend({}, this.props.value)

    model[field] = value;
    this.props.onChange(model)
  }

});

module.exports = Specify;