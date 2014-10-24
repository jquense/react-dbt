var _ = require('lodash')
  , path = require('path')
  , webpack = require('webpack')
  , pkg = require("../package.json")
  , ProdDefine = new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    })

module.exports = {

  dev: {

    devtool: 'source-map',

    entry: {
      app: './src/app.jsx',
      vendor: ['react', 'lodash', 'react-router', 'react-bootstrap', 'bluebird']
    },

    output: {
      filename: "app.js",
      path: path.join(__dirname, "./"),
      publicPath: "/"
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin("vendor", "lib.js")
    ],

    resolve: {
      alias: {
        'when/lib/Promise': 'bluebird',
        'type': 'type-of'
      }
    },

    module: {
      loaders: [
        { test: /\.jsx$/,  loader: 'jsx-loader?harmony=true&insertPragma=React.DOM' },
        { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
        { test: /\.woff$/, loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
        { test: /\.ttf$/,  loader: "file-loader?prefix=font/" },
        { test: /\.eot$/,  loader: "file-loader?prefix=font/" },
        { test: /\.svg$/,  loader: "file-loader?prefix=font/" },
        { test: /\.json$/, loader: "json-loader" },
        { test: /globalize/, loader: "imports?define=>false" }
      ],
    },
  }

}