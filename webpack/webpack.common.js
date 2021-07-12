const webpack = require("webpack");
var glob = require('glob');
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

// Source files: background must be top-level for some reason
const files = glob.sync('./source/*.ts').reduce(function(obj, el){
    obj[`source/${path.parse(el).name}`] = el;
    return obj
},{});
files["background"] = "./background.ts";

module.exports = {
    entry: files,
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks: "initial",
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: "./resources", context: "resources" }],
            options: {},
        }), // Resources including CSS, JS, and static files
        new CopyPlugin({
            patterns: [{ from: ".", to: "./pages", context: "pages" }],
            options: {},
        }), // HTML pages for extension popup
        new CopyPlugin({
            patterns: [{ from: "./manifest.json", to: "./manifest.json", context: "." }],
            options: {},
        }), // Manifest.json file
    ],
};
