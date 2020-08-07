import Vue from "vue";
import plugin from "../src/index";
import img from "./example.jpg";

Vue.use(plugin);

console.log(img);
const ele = new Vue({
  render(h) {
    return (
      <div>
        <img v-watermark src={"/" + img}></img>
        {/* <img v-watermark src="./example.jpg"></img> */}
      </div>
    );
  },
});

ele.$mount(document.getElementById("root"));
