const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
        },
      },
    },
    // minimizer: [new CssMinimizerPlugin()],
  },
  output: {
    filename: "[id][hash].js",
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({ template: "example/index.html" }),
    new BundleAnalyzerPlugin(),
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
