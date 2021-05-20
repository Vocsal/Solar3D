const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.js');
const webpack = require('webpack');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: 'dev.solar3d.com',
        port: 6378,
        hot: true,
        // open: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        })
    ],
    optimization: {
        moduleIds: 'named',
    }
})