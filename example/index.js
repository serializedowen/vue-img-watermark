import Vue from "vue";
import plugin, { setScopedConfig } from "../src/index";
import img from "./example.jpg";
import img2 from "./ex2.jpg";
Vue.use(plugin);

console.log(img);
const ele = new Vue({
  components: {
    seperate: {
      beforeCreate() {
        setScopedConfig({ mode: "topright" }, this);
      },
      mounted() {
        // setScopedConfig({ rotate: 20 }, this);
      },
      render(h) {
        return (
          <div>
            <img v-watermark src={"/" + img2}></img>
            <img v-watermark src={"/" + img}></img>
          </div>
        );
      },
    },
  },
  render(h) {
    return (
      <div>
        <seperate></seperate>
        <img v-watermark={{ content: "bbb" }} src={"/" + img}></img>
        <img v-watermark={{ content: "abee" }} src={"/" + img}></img>
      </div>
    );
  },
});

ele.$mount(document.getElementById("root"));
