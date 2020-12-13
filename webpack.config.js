const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const imagemin = require('imagemin');
// const imageminJpegtran = require('imagemin-jpegtran');
// const imageminPngquant = require('imagemin-pngquant');

module.exports = {

  //Our entry points. output-filename : input
  entry: {
        'style_output': './style.js'
    },

    //Control file location and naming conventions
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
    },

    node: { //allow dynamic filename substitution
        __filename: true,
        __dirname: true,
    },

    module: {
        rules: [
            {
                //even less-loader can compile less to css, css loader is still needed, it will also handle all url('') in css, and it will also rely on url-loader, url-loader again rely on file-loader
                //Load all css + less files then extract to their own file
                test: /\.(le|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                //Load static resources (relative to stylesheet)
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 8, // Convert images < 8kb to base64 strings
                            name: 'assets/images/[path][name].[ext]?[hash]'
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                          plugins: [
                            // require('imagemin-gifsicle')({
                            //   interlaced: false
                            // }),
                            require('imagemin-mozjpeg')({
                              progressive: true,
                              arithmetic: false
                            }),
                            require('imagemin-pngquant')({
                              floyd: 0.5,
                              speed: 2
                            }),
                            require('imagemin-svgo')({
                              plugins: [
                                { removeTitle: true },
                                { convertPathData: false }
                              ]
                            })
                          ]
                        }
                      }
                ]
            }
        ],
    },

    plugins: [
        //Extract css into its own file
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css",
            chunkFilename: "[name].bundle.css"
        })
    ]
};
