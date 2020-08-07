var path = require("path");

var PATHS = {
  entryPoint: path.resolve(__dirname, "src/index.ts"),
  bundles: path.resolve(__dirname, "lib"),
};

var config = {
  optimization: {
    minimize: true,
  },

  mode: "production",
  entry: {
    vueImageWatermark: [PATHS.entryPoint],
  },

  output: {
    path: PATHS.bundles,
    filename: "[name].js",
    libraryTarget: "umd",
    library: "vueImageWatermark",
    umdNamedDefine: true,
  },
  // Add resolve for `tsx` and `ts` files, otherwise Webpack would
  // only look for common JavaScript file extension (.js)
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = config;
