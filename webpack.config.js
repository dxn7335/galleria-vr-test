const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackConfig = require('webpack-config');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// npm_lifecycle_event is used as a flag for what npm script is run
// will be 'build' if 'npm run build'
const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  src: path.join(__dirname, "src"),
  build: path.join(__dirname, "build")
};

process.env.BABEL_ENV = TARGET;

const common = {
  entry: {
    app: PATHS.src + '/index',
  },

  output: {
    path: PATHS.build,
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|build)/,
        loader: 'babel-loader',
        include: PATHS.src
      },
      { 
        test: /\.json$/, 
        loader: 'json-loader',
        include: PATHS.src
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
        include: PATHS.src
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2($|\?))$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]',
        include: PATHS.src
      },
      {
        test: /\.(otf|ttf|eot?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
    ],
  },
};

const devTools = {
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: PATHS.src + '/index.html'
    }),
    new ExtractTextPlugin('[name].css')
  ],

  devtool: 'eval-source-map',

  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true,
    // display only errors to reduce the amount of output
    stats: 'errors-only',
    inline: true,
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
  }
};

if( TARGET === 'start' || !TARGET ) {
  module.exports = merge(common, devTools);
} 
else if ( TARGET === 'build' ) {
  module.exports = common;
}
