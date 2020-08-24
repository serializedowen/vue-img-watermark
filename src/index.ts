import { VueConstructor } from "vue";
import { DirectiveBinding } from "vue/types/options";
import { VNode } from "vue/types/umd";
import selectStrategy, { registerCustomStrategy } from "./selectStrategy";

export type WatermarkOptionConfig = {
  mode: displayMode;
  textBaseline: CanvasTextBaseline;
  fillStyle: string | CanvasGradient | CanvasPattern;
  content: string;
  font: string;
  rotate: number;
};

export type displayMode =
  | "bottomleft"
  | "bottomright"
  | "topleft"
  | "topright"
  | "center"
  | "fill";

let canvas: HTMLCanvasElement;

export { registerCustomStrategy };

registerCustomStrategy("fill", (ctx, options) => {
  const getRadian = (degree: number) => (degree * Math.PI) / 180;
  ctx.textAlign = "center";
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const padding = 100;
  ctx.translate(
    (width / 2) * Math.tan(getRadian(options.rotate)),
    (-height / 2) * Math.tan(getRadian(options.rotate))
  );

  ctx.rotate((options.rotate * Math.PI) / 180);

  let x = 20;
  let y = 20;
  let addingX = true;
  while (y < height * 2) {
    ctx.fillText(options.content, x, y);

    if (x > width * 2) {
      x = 20;
      addingX = false;
    }

    if (addingX) x += padding;
    else {
      y += padding;
      addingX = true;
    }
  }
});

const defaultOptions: WatermarkOptionConfig = Object.freeze({
  mode: "fill",
  textBaseline: "middle",
  font: "15px Arial",
  fillStyle: "rgba(184, 184, 184, 0.8)",
  content: "请勿外传",
  rotate: 45,
});

let globalOptions: WatermarkOptionConfig = { ...defaultOptions };
const scopedConfigMap: WeakMap<Vue, WatermarkOptionConfig> = new WeakMap();

export const setScopedConfig = (
  opts: Partial<WatermarkOptionConfig>,
  vm: Vue
) => {
  //@ts-ignore
  if (!vm._isVue) throw new Error("target isn't not a valid vue instance.");

  if (!scopedConfigMap.has(vm)) {
    scopedConfigMap.set(vm, { ...defaultOptions, ...opts });
  } else {
    scopedConfigMap.set(vm, { ...scopedConfigMap.get(vm), ...opts });
  }
};

export const setGlobalConfig = (opts: Partial<WatermarkOptionConfig>) => {
  globalOptions = { ...globalOptions, ...opts };
};

const getCanvas = () => {
  if (!canvas) {
    canvas = document.createElement("canvas");
    // canvas.style.display = "none";
    // canvas.style.position = "absolute";
    // canvas.style.zIndex = "-9999";
    // document.body.append(canvas);
  }
  return canvas;
};

const vueImgWatermark = {
  install: (Vue: VueConstructor) => {
    Vue.directive("watermark", {
      bind(
        element: HTMLImageElement,
        binding: DirectiveBinding,
        VNode: VNode
        // oldVNode: VNode
      ) {
        let options: WatermarkOptionConfig;

        const bindingOptions: Partial<WatermarkOptionConfig> = binding.value;

        if (scopedConfigMap.has(VNode.context)) {
          options = {
            ...scopedConfigMap.get(VNode.context),
            ...bindingOptions,
          };
        } else {
          options = { ...globalOptions, ...bindingOptions };
        }

        function loader() {
          element.removeEventListener("load", loader);
          const { width, height } = element;
          const ctx = getCanvas().getContext("2d");

          const { textBaseline, fillStyle, font, mode } = options;

          getCanvas().width = width;
          getCanvas().height = height;

          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(element, 0, 0, width, height);

          ctx.textBaseline = textBaseline;
          ctx.font = font;
          ctx.fillStyle = fillStyle;

          selectStrategy(mode)(ctx, options);

          const url = ctx.canvas.toDataURL();

          //@ts-ignore
          VNode.__url ? VNode.__url.push(url) : (VNode.__url = [url]);

          element.src = url;

          VNode.context.$emit("img:watermarked", element, options);
          element.addEventListener("load", function temp() {
            element.removeEventListener("load", temp);
            element.addEventListener("load", loader);
          });
        }
        element.setAttribute("crossorigin", "anonymous");
        element.addEventListener("load", loader);
      },

      unbind(el, binding, VNode) {
        //@ts-ignore
        VNode.__url && VNode.__url.map(URL.revokeObjectURL);
      },
    });
  },
};

export default vueImgWatermark;
