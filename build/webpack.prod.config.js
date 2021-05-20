const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.js');
const webpack = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
})

// 代码分离，懒加载...