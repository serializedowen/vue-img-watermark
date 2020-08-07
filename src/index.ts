import { VueConstructor } from "vue";

let canvas: HTMLCanvasElement;
let options: optionConfig;

export type optionConfig = {
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
  fillStyle: string | CanvasGradient | CanvasPattern;
  content: string;
  font: string;
  rotate: number;
  zIndex: number;
};

const defaultOptions: optionConfig = {
  textAlign: "center",
  textBaseline: "middle",
  font: "15px Arial",
  fillStyle: "rgba(184, 184, 184, 0.8)",
  content: "请勿外传",
  rotate: 30,
  zIndex: 1000,
};

const getCanvas = () => {
  if (!canvas) {
    canvas = document.createElement("canvas");
    // canvas.style.display = "none";
    // canvas.style.position = "absolute";
    // canvas.style.zIndex = "-9999";
    document.body.append(canvas);
  }
  return canvas;
};

export const setCanvasAttr = (opts: Partial<optionConfig> = {}) => {
  Object.keys(opts).map((key) => {
    // getCanvas().setAttribute(key, options[key]);
  });

  return getCanvas();
};

const vueImgWatermark = {
  install: (Vue: VueConstructor) => {
    Vue.directive("watermark", {
      inserted(element: HTMLImageElement, binding, VNode, oldVNode) {
        let marked = false;

        console.log(VNode);

        element.addEventListener("load", () => {
          if (!marked) {
            marked = true;

            element.setAttribute("crossorigin", "anonymous");
            const { width, height } = element;
            const ctx = getCanvas().getContext("2d");
            getCanvas().width = width;
            getCanvas().height = height;

            const {
              textAlign,
              textBaseline,
              fillStyle,
              content,
              rotate,
              font,
            } = defaultOptions;

            setTimeout(() => {
              ctx.drawImage(element, 0, 0, width, height, 0, 0, width, height);
              ctx.textAlign = textAlign;
              ctx.textBaseline = textBaseline;

              ctx.font = font;
              ctx.fillStyle = fillStyle;

              ctx.rotate((Math.PI / 180) * rotate);
              ctx.fillText(content, width / 2, height / 2);

              element.src = ctx.canvas.toDataURL();
            }, 500);
          }
        });
      },
    });
  },
};

export default vueImgWatermark;
