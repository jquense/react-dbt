'use strict';
var gulp    = require('gulp')
  , _       = require('lodash')
  , configs = require('./webpack.configs');


module.exports = {

  devServer: function() {

    //gulp.watch('./src/less/**/*.less',  ['watch-less']);

    // new WebpackDevServer(webpack(configs.dev), {
    //   publicPath: "/",
    //   stats: { colors: true },
    //   quiet: true,
    // }).listen(8080, "localhost");

  }
}

