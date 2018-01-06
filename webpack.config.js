const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: path.resolve(__dirname, "src", "main.js"),
    output: {
        path: path.resolve(__dirname, "src", "static", "js"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader"
            }
        ]
    },
    // use "eval" for debugging with stacktraces, "source-map" for production
    devtool: "eval",
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            warnings: false,
            mangle: true
        })
    ]
}
