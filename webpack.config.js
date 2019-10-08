const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


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
                //Load all css + less files then extract to their own file
                test: /\.(le|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                    "less-loader"
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
