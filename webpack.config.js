const path = require("path");

module.exports = {
    entry: ["babel-regenerator-runtime", "./src/index.js"],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    presets: ["env", "stage-2", "react"]
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    devtool: "inline-source-map"
};
