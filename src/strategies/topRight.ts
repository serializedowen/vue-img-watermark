import { OptionConfig } from "..";

export default (ctx: CanvasRenderingContext2D, options: OptionConfig) => {
  ctx.textAlign = "right";
  ctx.fillText(options.content, ctx.canvas.width - 20, 20);
};
