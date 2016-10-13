var path = require('path')
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./src/index.vue",
  output: {
    path: "./dist",
    publicPath: "/dist/",
    filename: "vue-typeahead.js",
    library: ["vueTypeahead"],
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: "vue"
      }
    ]
  },
  vue: {
    loaders: {
      sass: ExtractTextPlugin.extract("css!sass")
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new ExtractTextPlugin("vue-typeahead.css")
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.output.filename = "vue-typeahead.min.js",
  module.exports.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin("vue-typeahead.min.css")
  ];
} else {
  module.exports.devtool = '#source-map'
}
