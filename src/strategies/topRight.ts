import { WatermarkOptionConfig } from "..";

export default (
  ctx: CanvasRenderingContext2D,
  options: WatermarkOptionConfig
) => {
  ctx.textAlign = "right";
  ctx.fillText(options.content, ctx.canvas.width - 20, 20);
};
