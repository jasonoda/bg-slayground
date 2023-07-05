const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const commonConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: false
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'createGameData.js', to: 'createGameData.js' },
                { from: 'src/validateGameData.js', to: 'src/validateGameData.js' },
                { from: 'node_modules/crypto-js/crypto-js.js', to: 'node_modules/crypto-js/crypto-js.js' }
            ]
        }),
    ],
})
