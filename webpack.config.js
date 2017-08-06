let path = require('path');
let WHP = require('webpack-html-plugin');
let StyleExtract = require('extract-text-webpack-plugin');
let webpack = require('webpack');

module.exports = {
    entry:'./index.js',
    output: {
        path:path.resolve('dist'),
        filename:'app.js',
    },
    module: {
        rules:[
            {test:/\.jsx?$/, loader:'babel-loader', options:{presets:['es2015','react']}, exclude:/(node_modules)/},
            {test:/\.css$/, use:StyleExtract.extract({
                use:'css-loader',
                fallback:'style-loader'
            })}
        ]
    },
    externals: {
        'react':'React',
        'react-dom':'ReactDOM',
        'firebase':'firebase'
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }),
        new WHP({
            template:'./index.html',
            filename:'index.html',
            inject:'body'
        }),
        new StyleExtract('style.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false
        })
    ]
}