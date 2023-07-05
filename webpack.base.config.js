const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: "development",
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'game.html',
            filename: 'game.html',
            inject: false
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/img', to: 'src/img' },
                { from: 'src/sounds', to: 'src/sounds'}
            ]
        }),
    ],
    entry: {
        index: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].build.js'
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "src/img/[name][ext]",
                },
            },
            {
                test: /\.(mp3)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "src/sounds/[name][ext]",
                },
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.html$/i,
                loader: 'string-replace-loader',
                options: {
                    search: './build/',
                    replace: './',
                    flags: 'g'
                }
            },
        ],
        
    }
    
      
};