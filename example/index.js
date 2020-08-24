import Vue from "vue";
import plugin, { setScopedConfig, setGlobalConfig } from "../src/index";
// import plugin, { setScopedConfig } from "@serializedowen/vue-img-watermark";
import insertAndHightlightConfig from "./hightlight";
import renderImage from "./renderImage";

import "./index.css";
import "prismjs/themes/prism.css";

Vue.use(plugin);

setGlobalConfig({ fillStyle: "white" });

new Vue({
  created() {
    this.$on("img:watermarked", insertAndHightlightConfig);
  },
  components: {
    seperate: {
      beforeCreate() {
        this.$on("img:watermarked", insertAndHightlightConfig);

        setScopedConfig(
          {
            mode: "bottomright",
            content: "@serializedowen",
            fillStyle: "white",
          },
          this
        );
      },
      render(h) {
        return (
          <div>
            <h2>Use scoped config</h2>
            {renderImage(h, {})}
            {renderImage(h, {})}
            {renderImage(h, {})}
          </div>
        );
      },
    },
  },
  render(h) {
    return (
      <div>
        <seperate></seperate>

        <h2>Use global config</h2>

        <div>
          {renderImage(h, {})}
          {renderImage(h, {})}
        </div>
        <h2>Use individual config</h2>

        <div>
          {renderImage(h, { content: "@serializedowen" })}
          {renderImage(h, { content: "@serializedowen", mode: "topleft" })}
          {renderImage(h, { content: "@serializedowen", mode: "topright" })}
          {renderImage(h, { content: "@serializedowen", mode: "bottomleft" })}
          {renderImage(h, { content: "@serializedowen", mode: "bottomright" })}
        </div>
      </div>
    );
  },
}).$mount(document.getElementById("root"));
