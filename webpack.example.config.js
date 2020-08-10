const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({ template: "example/index.html" }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false,
    }),
  ],
  devtool: "sourcemap",
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        loader: "file-loader",
      },
      {
        test: /\.css$/i,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          "style-loader",
          "css-loader",
        ],
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
        use: "ts-loader",
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
