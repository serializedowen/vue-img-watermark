import Vue from "vue";
import plugin, { setScopedConfig, setGlobalConfig } from "../src/index";
// import plugin, { setScopedConfig } from "@serializedowen/vue-img-watermark";
import insertAndHightlightConfig from "./hightlight";
import renderImage from "./renderImage";
import getRandomConfig from "./getRandomConfig";
import "./index.css";
import "prismjs/themes/prism.css";
import { shuffle } from "lodash";
import getRandomPic from "./getRandomPic";
import { v4 as uuid } from "uuid";
Vue.use(plugin);

setGlobalConfig({ fillStyle: "white" });

new Vue({
  created() {
    this.$on("img:watermarked", insertAndHightlightConfig);
  },

  methods: {
    addPicture() {
      this.randoms.push({ url: getRandomPic(), uid: uuid() });
    },
  },
  components: {
    seperate: {
      data() {
        return { urls: [getRandomPic(), getRandomPic(), getRandomPic()] };
      },
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
            {this.urls.map((url) => renderImage(h, url))}
          </div>
        );
      },
    },
  },
  data() {
    return {
      urls: [
        getRandomPic(),
        getRandomPic(),
        getRandomPic(),
        getRandomPic(),
        getRandomPic(),
        getRandomPic(),
        getRandomPic(),
        getRandomPic(),
      ],
      randoms: [{ url: getRandomPic(), uid: uuid() }],
    };
  },
  render(h) {
    return (
      <div>
        <h2>
          Use random config <button onClick={this.addPicture}>Add</button>
          <button onClick={() => (this.randoms = shuffle(this.randoms))}>
            Shuffle
          </button>
        </h2>

        <div>
          <transition-group name="flip" tag="div" class="transition">
            {this.randoms.map(({ url, uid }) =>
              renderImage(h, url, getRandomConfig(), uid)
            )}
          </transition-group>
        </div>
        <seperate></seperate>

        <h2>Use global config</h2>

        <div>{this.urls.slice(0, 2).map((url) => renderImage(h, url))}</div>
        <h2>Use individual config</h2>

        <div>
          {renderImage(h, this.urls[2], { content: "@serializedowen" })}
          {renderImage(h, this.urls[3], {
            content: "@serializedowen",
            mode: "topleft",
          })}
          {renderImage(h, this.urls[4], {
            content: "@serializedowen",
            mode: "topright",
          })}
          {renderImage(h, this.urls[5], {
            content: "@serializedowen",
            mode: "bottomleft",
          })}
          {renderImage(h, this.urls[6], {
            content: "@serializedowen",
            mode: "bottomright",
          })}
        </div>
      </div>
    );
  },
}).$mount(document.getElementById("root"));
