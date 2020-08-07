import Vue from "vue";
import plugin, { setScopedConfig } from "../src/index";
import img from "./example.jpg";

Vue.use(plugin);

console.log(img);
const ele = new Vue({
  components: {
    seperate: {
      beforeCreate() {
        setScopedConfig({ mode: "topleft" }, this);
      },
      mounted() {
        setScopedConfig({ mode: "bottomleft", rotate: 20 }, this);
      },
      render(h) {
        return (
          <div>
            <img v-watermark={{ bbb: "aaaa" }} src={"/" + img}></img>
            {/* <img v-watermark src="./example.jpg"></img> */}
          </div>
        );
      },
    },
  },
  render(h) {
    return (
      <div>
        <seperate></seperate>
        <img v-watermark={{ aaa: "bbb" }} src={"/" + img}></img>
        {/* <img v-watermark src="./example.jpg"></img> */}
      </div>
    );
  },
});

ele.$mount(document.getElementById("root"));
