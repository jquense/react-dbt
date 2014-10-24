var React = require('react')
  , dm   = require('../util/locale').dates
  , Link = require('react-router').Link
  , _ = require('lodash');

module.exports = HistoryItem = React.createClass({

  render: function() {
    var date = this.props.date

    return (
      <li>
        <Link to="diary" query={{ date: date.toISOString() }}
            className="btn btn-link btn-lg col-md-2 col-lg-1 text-success">
            {dm.format(date, 'dd')}
            {this.props.submitted
              ? <i className="fa fa-check-circle"></i>
              : ''}
        </Link>
        <div className="col-md-10 col-lg-11 hidden-sm hidden-xs">
          <div className="btn-group btn-group-justified" style={{marginTop: 5}}>
            {_.map(this.props.days, function(day, k){
              return (
                <Link to="diary" params={{ date: date.toISOString() }} className="btn btn-default">
                  {dm.format(day.date,'EEEE')}
                </Link>)
            })}
          </div>
        </div>
      </li>
    );
  }
});






