var webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
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
        query: {
          presets: ['es2015'],
        },
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: "vue-html-loader",
        exclude: /node_modules/
      },
      {
        test: /\.sss$/,
        loader: "style-loader!css-loader!postcss-loader?parser=sugarss",
        exclude: /node_modules/
      },
    ]
  },
  postcss: function() {
    return [
      require('postcss-nested'),
      require('autoprefixer'),
    ]
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.output.filename = "vue-typeahead.min.js",
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
  ];
} else {
  module.exports.devtool = '#source-map'
}
