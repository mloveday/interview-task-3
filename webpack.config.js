var path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/index.ts',
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
                options: {presets: ["@babel/env", "@babel/preset-typescript"]}
            }
        ]
    },
    resolve: {
        modules: ["src", "node_modules"],
        extensions: ["*", ".ts", ".tsx", '.js', '.jsx']
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 8000
    }
};