const path = require('path');
const { merge } = require('webpack-merge');
const prodConfig = require('./webpack.prod.config.js');

const WebHomeStaticDirName = "solar3d";
const WebHomeStaticDir = path.join(__dirname, "../../server-nginx/nginx/public/code01.cn/");

const config = merge(prodConfig, {
    output: {
        path: path.join(WebHomeStaticDir, WebHomeStaticDirName),
        publicPath: "/" + WebHomeStaticDirName + "/",
    },
})
module.exports = config;