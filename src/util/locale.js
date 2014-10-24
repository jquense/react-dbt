var dm   = require('date-arithmetic')
  , Globalize = require( "globalize" );

var dates =  require("cldr-data/json/main/en/ca-gregorian.json" )
// Before we can use Globalize, we need to feed it on the appropriate I18n content (Unicode CLDR). Read Requirements on Getting Started on the root's README.md for more information.
Globalize.load(
  require("cldr-data/json/main/en/ca-gregorian.json" ),
  require("cldr-data/json/main/en/timeZoneNames.json" ),
  require("cldr-data/json/supplemental/likelySubtags.json" ),
  require("cldr-data/json/supplemental/timeData.json" ),
  require("cldr-data/json/supplemental/weekData.json" )
);

Globalize.locale( "en" );
Globalize.formatDate(new Date, {datetime: 'short'})

dm.format = function(date, pat){
  return Globalize.formatDate(date, { pattern: pat } )
}

module.exports = {
  globalize: Globalize,
  dates: dm
}