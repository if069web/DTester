var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: 'http://dtapi.local/~pupkin/DTester/dist/',
	//publicPath: 'http://ec2-35-160-47-83.us-west-2.compute.amazonaws.com/~ubuntu/DTester/dist/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    watch:true,

    watchOption: {
        aggregateTimeout: 100
    },

    htmlLoader: {
        minimize: false
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ]
});