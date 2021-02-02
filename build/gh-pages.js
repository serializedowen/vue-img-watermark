const webpack = require("webpack");
const config = require("../webpack.example.config");
const ghPages = require("gh-pages");

config.mode = "production";
delete config.devtool;

webpack(config, (...args) => {

  ghPages.publish("dist", () => {
    console.info("published");
  });
});
