import { OptionConfig } from "..";

export default (ctx: CanvasRenderingContext2D, options: OptionConfig) => {
  ctx.textAlign = "left";
  ctx.fillText(options.content, 20, 20);
};
