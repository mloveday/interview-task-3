var path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/gh-index.tsx',
    mode: 'production',
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