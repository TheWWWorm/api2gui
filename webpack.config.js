const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');
const config = require('./lib/config');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    devtool: debug ? 'inline-sourcemap' : null,
    entry:  ['babel-polyfill', './js/client.js'],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            }
        ]
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'src'),
        filename: 'client.min.js'
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};
