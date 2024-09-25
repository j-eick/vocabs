/**
 * Returns TRUE, IF input is not null, empty or undefined
 *
 * @param input
 * @returns
 */
export default function isNotNEU(input: string | object[] | null | undefined): input is string {
  // if (input === null) {
  //   console.warn("Input is null");
  // }
  // if (input === undefined) {
  //   console.warn("Input is undefined");
  // }
  // if (!input.length) {
  //   console.warn("Input is empty");
  // }

  return input !== null && input !== undefined && input !== "";
}
