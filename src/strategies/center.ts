import { OptionConfig } from "..";

export default (ctx: CanvasRenderingContext2D, options: OptionConfig) => {
  ctx.textAlign = "center";
  ctx.fillText(
    options.content,
    Math.floor(ctx.canvas.width / 2),
    Math.floor(ctx.canvas.height / 2)
  );
};
