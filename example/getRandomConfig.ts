import { WatermarkOptionConfig, displayMode } from "../src";

const randomInt = (upperbound) => Math.floor(Math.random() * upperbound);

const modes: Array<displayMode> = [
  "topleft",
  "topright",
  "bottomright",
  "bottomleft",
  "fill",
];
const fillStyles = [
  "white",
  "pink",
  "grey",
  "orange",
  "blueviolet",
  "coral",
  "thistle",
  "crimson",
  "yellow",
  "black",
];

export default (): Partial<WatermarkOptionConfig> => ({
  content: "@serializedowen",
  mode: modes[randomInt(modes.length)],
  fillStyle: fillStyles[randomInt(fillStyles.length)],
  rotate: randomInt(60),
  font: randomInt(10) + 15 + "px Ariel",
});
