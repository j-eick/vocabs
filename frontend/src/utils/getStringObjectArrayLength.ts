export function getStringObjectArrayLength(input: string | object[] | object): number {
  let length: number = 0;

  try {
    if (typeof input === "string") {
      length = input.length;
    } else if (typeof input === "object") {
      length = JSON.stringify(input).length;
    } else {
      throw new Error("Type of input is not supported");
    }
  } catch (err) {
    console.error(err);
  }

  return length;
}
