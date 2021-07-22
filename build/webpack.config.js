const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: path.join(__dirname, '../src/index.ts'),
        examples: path.join(__dirname, '../examples/planet/index.ts'),
        earth: path.join(__dirname, '../examples/earth/index.ts'),
    },
    output: {
        filename: 'js/[name].[contenthash].js',
        path: path.join(__dirname, '../dist'),
        // path: path.join(__dirname, '../../web_home/static/solar3d'),
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".ts", ".tsx", ".d.ts", ".css", "sass", "scss"],
        alias: {
            "src": path.resolve(__dirname, '../src/'),
            "#": path.resolve(__dirname, "../"),
            "node_modules": path.join(__dirname, '../node_modules/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    'cache-loader',
                    'thread-loader',
                    {
                        loader: 'babel-loader?cacheDirectory',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-runtime'],
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: "img/[name].[contenthash].[ext]"
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: "file/[name].[contenthash].[ext]"
                }
            },
            {
                test: /\.(csv|tsv)$/,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/,
                use: ['xml-loader'],
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            title: "Solar 3D",
            favicon: './src/file/icon/earth.jpg',
            chunks: ["commons", "vendors", "runtime", "index"],
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "examples/index.html",
            title: "Solar 3D Examples",
            favicon: './src/file/icon/earth.jpg',
            chunks: ["commons", "vendors", "runtime", "examples"],
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "examples/earth.html",
            title: "Solar 3D Earth",
            favicon: './src/file/icon/earth.jpg',
            chunks: ["commons", "vendors", "runtime", "earth"],
            inject: "body",
        }),
    ],
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        // 代码分离
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    minSize: 0,
                    name: "commons",
                },
                // commons: {
                //     chunks: 'all',
                //     name: 'commons',
                //     minChunks: 10,
                //     enforce: true,
                //     reuseExistingChunk: true //可设置是否重用该chunk（查看源码没有发现默认值）
                // },
                // vendor: {
                //     test: /[\\/]node_modules[\\/]/,
                //     name: 'vendors',
                //     chunks: 'all',
                // },
            }
        }
    },
}