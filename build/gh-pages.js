const webpack = require("webpack");
const config = require("../webpack.example.config");
const ghPages = require("gh-pages");

webpack(config, () => {
  console.log("object");
  ghPages.publish("dist", () => {
    console.info("published");
  });
});
