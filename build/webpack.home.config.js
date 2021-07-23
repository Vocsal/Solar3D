const path = require('path');
const { merge } = require('webpack-merge');
const prodConfig = require('./webpack.prod.config.js');

const WebHomeStaticDirName = "solar3d";
// const WebHomeStaticDir = "";

const config = merge(prodConfig, {
    output: {
        path: path.join(__dirname, '../../web_home/static/', WebHomeStaticDirName),
        publicPath: "../" + WebHomeStaticDirName + "/",
    },
})
module.exports = config;