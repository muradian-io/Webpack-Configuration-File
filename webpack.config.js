const path = require('path');

const {
    ProvidePlugin
} = require('webpack');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcFolder = 'src';
const distFolder = 'dist';

module.exports = {
    entry: {
        app: path.join(__dirname, srcFolder, 'ts', 'app.tsx')
    },

    // resolve: {
    //     extensions: ['', '.js', '.ts', '.tsx', '.json'],
    //     alias: path.join(__dirname, srcFolder, '.ts')
        
    // },

    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        },
 
        {
            test: /\.json?$/,
            loader: 'json'
        },

        {
            test: /\.scss?$/,
            exclude: [path.join(__dirname, srcFolder, 'ts')],
            loaders: ['style-loader', 'css-loader', 'sass-loader']

        },

        {
            test: /\.scss$/,
            exclude: [path.join(__dirname, srcFolder, 'scss')],
            loaders: ['raw-loader', 'sass-loader']

        }

        ]

    },
    //postcss: [require('autoprefixer')],

    plugins: [

        new ProvidePlugin({
            Promise: 'es6-promise',
            fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),

        new CopyWebPackPlugin([{
            from: path.join(srcFolder, 'images'),
            to: path.join('..', 'images')
        }]),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, srcFolder, 'index.html'),
            filename: path.join('..', 'index.html'),
            inject: 'body'
        })

    ],
    output: {
        path: path.join(__dirname, distFolder, 'js'),
        filename: '[name].js',
        publicPath: '/js'
    },

    devtool: 'source-map',
    
    devServer: {
        contentBase: 'dist',
        historyApiFallback: true,
        port: 5000,
        proxy: {
            '/widgets': {
                target: 'http://0.0.0.0:3010'
            }
        }
    }


};
