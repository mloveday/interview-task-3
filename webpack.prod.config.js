const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: './src/gh-index.tsx',
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    output: {
        path: path.resolve(__dirname, "public/dist/"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/env", "@babel/preset-typescript", "@babel/preset-react"]
                }
            }
        ]
    },
    resolve: {
        modules: ["src", "node_modules"],
        extensions: ["*", ".ts", ".tsx", '.js', '.jsx']
    },
};