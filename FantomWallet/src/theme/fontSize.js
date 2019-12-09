import {getWidth} from "../utils/pixelResolver"
const base = getWidth(16);

export const FontSize = {
  tiny: base * 0.5, // 8
  xSmall: base * 0.625, // 10
  small: base * 0.75, // 12
  mediumSmall: base * 0.875, // 14
  base, // 16
  mediumlarge: base * 1.125, // 18
  large: base * 1.25, // 20
  xLarge: base * 1.5, // 24
  huge: base * 2, // 32
  massive: base * 2.25 // 36
};
