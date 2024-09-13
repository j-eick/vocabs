/**
 * CC => Console Colors
 *
 * Based on ANSI control character to color outputs.
 * Both bg and text color are number coded.
 * E.G.: text colors
 *  - black = 30
 *  - red   = 31
 *  - green = 32
 *  - yellow= ...
 *
 * E.G.: bg colors
 *  - black = 40
 *  - red   = 41
 *  - green = 42
 *  - yellow= ...
 *
 *  As of now, only 41 and 42 are used.
 *
 * @param input - console text
 * @param type -  as of now:
 *                  - "warn" = red background
 *                  - "info" = green background
 */
export const CC = (input: string, type: "warn" | "info") => {
  // text colors:

  let color = "";

  // color codes
  switch (type) {
    case "warn":
      color = "41"; // red bg
      break;
    case "info":
      color = "42"; // green bg
      break;
    default:
      color = "0"; // white
  }

  // control characters
  const openingTag = `\x1b[${color}m`;
  const closingTag = "\x1b[0m";

  return console.log(`${openingTag} ${input} ${closingTag}`);
};
