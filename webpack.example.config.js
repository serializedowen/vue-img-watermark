const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  plugins: [new HtmlWebpackPlugin({ template: "example/index.html" })],
  devtool: "sourcemap",
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        loader: "file-loader",
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx?$/,
        use: "awesome-typescript-loader",
        exclude: /node_modules/,
      },
    ],
  },

  entry: {
    example: path.resolve(__dirname + "/example/index.js"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
