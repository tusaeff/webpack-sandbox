const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  context: resolve("./"),
  entry: {
    home: resolve("./src/index.js")
  },
  output: {
    filename: "static/[name].[contenthash].js",
    path: resolve("dist")
  },
  module: {
    rules: []
  },
  resolve: {
    alias: {
      src: resolve("./src")
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "webpack playground",
      filename: "index.html",
      template: "index.html",
      chunks: "all"
    })
  ]
};
