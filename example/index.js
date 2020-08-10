import Vue from "vue";
import plugin, { setScopedConfig, setGlobalConfig } from "../src/index";
// import plugin, { setScopedConfig } from "@serializedowen/vue-img-watermark";
import img from "./example.jpg";
import img2 from "./ex2.jpg";
import Prism from "prismjs";
import { format } from "prettier/standalone";
import babel from "prettier/parser-babel";

import "./index.css";
import "prismjs/themes/prism.css";

Vue.use(plugin);

setGlobalConfig({ fillStyle: "white" });

const insertAndHightlightConfig = (element, options) => {
  element.parentElement.style.position = "relative";
  const pre = document.createElement("pre");
  pre.style.transform = "translate(-" + element.width + "px, 0px)";
  pre.style.width = element.width + "px";
  pre.style.height = element.height + "px";
  const code = document.createElement("code");

  code.textContent = format("const option = " + JSON.stringify(options), {
    parser: "babel",
    plugins: [babel],
  });

  code.classList.add("language-javascript");
  pre.appendChild(code);
  element.after(pre);

  Prism.highlightElement(code);
};

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
            <h2>scoped config</h2>
            <div class="image-container">
              <img v-watermark src={img2}></img>
            </div>
            <div class="image-container">
              <img v-watermark src={img}></img>
            </div>
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
        <div class="image-container">
          <img v-watermark src={img}></img>
        </div>

        <h2>Use individual config</h2>
        <div class="image-container">
          <img v-watermark={{ content: "@serializedowen" }} src={img}></img>
        </div>
        <div class="image-container">
          <img
            v-watermark={{ content: "@serializedowen", mode: "topleft" }}
            src={img}
          ></img>
        </div>

        <div class="image-container">
          <img
            v-watermark={{ content: "@serializedowen", mode: "topright" }}
            src={img}
          ></img>
        </div>

        <div class="image-container">
          <img
            v-watermark={{ content: "@serializedowen", mode: "bottomleft" }}
            src={img}
          ></img>
        </div>

        <div class="image-container">
          <img
            v-watermark={{ content: "@serializedowen", mode: "bottomright" }}
            src={img}
          ></img>
        </div>
      </div>
    );
  },
}).$mount(document.getElementById("root"));
