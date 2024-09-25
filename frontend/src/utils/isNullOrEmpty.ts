/**
 * Returns TRUE, IF input is not null, empty or undefined
 *
 * @param input
 * @returns
 */
export default function isNotNEU(input: string | object[] | null | undefined): input is string {
  if (input === null) {
    throw new Error("Input is null");
  }
  if (input === undefined) {
    throw new Error("Input is undefined");
  }
  if (!input.length) {
    throw new Error("Input is empty");
  }

  return input !== null && input !== undefined && input !== "";
}
