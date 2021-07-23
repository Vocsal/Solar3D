const path = require('path');
const { merge } = require('webpack-merge');
const prodConfig = require('./webpack.prod.config.js');

const WebHomeStaticDir = "./solar3d";
// const WebHomeStaticDir = "";

const config = merge(prodConfig, {
    output: {
        path: path.join(__dirname, '../../web_home/static', WebHomeStaticDir),
        publicPath: WebHomeStaticDir,
    },
})
module.exports = config;