var path = require('path');
var fs = require('fs');
const webpack = require('webpack');

var BUILD_DIR = path.resolve(__dirname, 'dist');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var config = {
  devtool: 'source-map',
  target: 'node',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, './server.js')
  ],
  externals: nodeModules,
  output: {
      path: BUILD_DIR,
      filename: 'bundle.js',
      publicPath: '/public/',
      chunkFilename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  node: {
   dns: "mock",
   path: true,
   url: false,
   fs: "empty"
  }


}

module.exports = config;
