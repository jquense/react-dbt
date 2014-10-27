

/**
 * @jsx React.DOM
 */

var React = require('react')
  , _ = require('lodash');

var RadioRange = React.createClass({

  propTypes: {
    range: React.PropTypes.number,
  },

  render: function() {
    var labels = [], inputs = []
      , name = this.props.name;

    _.each(_.range(this.props.range), function(i){
      inputs.push(<td><input type="radio" checked={this.props.value === i} onChange={this._change} name={name} value={i}/></td>)
      labels.push(<td><label class={this.props.classes}>&nbsp;{i}&nbsp;</label></td>)
    }, this)

    return (
      <table className='radio-range'>
        <tr>{inputs}</tr>
        <tr>{labels}</tr>
      </table>
    );
  },
  _change: function(e){
    this.props.onChange
      && this.props.onChange(parseInt(e.target.value, 10))
  }

});

module.exports = RadioRange
