import { displayMode } from ".";
import bottomLeft from "./strategies/bottomLeft";
import topLeft from "./strategies/topLeft";
import topRight from "./strategies/topRight";
import bottomRight from "./strategies/bottomRight";
import center from "./strategies/center";

const strategies = {};

export const registerCustomStrategy = (
  name: string,
  strategy: typeof bottomLeft
) => {
  strategies[name] = strategy;
};

export default function selectStrategy(mode: displayMode) {
  switch (mode) {
    case "topleft":
      return topLeft;
    case "topright":
      return topRight;
    case "bottomleft":
      return bottomLeft;
    case "bottomright":
      return bottomRight;
    case "center":
      return center;
    default:
      if (strategies[mode]) return strategies[mode];
      throw new Error("custom strategy not found!");
  }
}
