import { WatermarkOptionConfig } from "..";

export default (
  ctx: CanvasRenderingContext2D,
  options: WatermarkOptionConfig
) => {
  ctx.textAlign = "left";
  ctx.fillText(options.content, 20, 20);
};
