'use strict'

const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: "./src/index.js", //已多次提及的唯一入口文件
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js" //打包后输出文件的文件名
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.html$/, loader: 'raw-loader' },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.ts']
        // alias: {
        //     jquery: path.resolve('./node_modules/jquery/dist/jquery.js'),
        //     angular: path.resolve('./node_modules/angular/angular.js,'),
        //     bootstrap: path.resolve('./node_modules/bootstrap/dist/css/bootstrap.css')
        // }
    }
}
