import { WatermarkOptionConfig } from "..";

export default (
  ctx: CanvasRenderingContext2D,
  options: WatermarkOptionConfig
) => {
  ctx.textAlign = "center";
  ctx.fillText(
    options.content,
    Math.floor(ctx.canvas.width / 2),
    Math.floor(ctx.canvas.height / 2)
  );
};
