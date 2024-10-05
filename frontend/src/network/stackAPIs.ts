export async function fetchAllStacks() {
  let res;

  try {
    res = await fetch("api/stacks", { method: "GET" });

    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Something went wrong while loading stacks.");
    }
  } catch (error) {
    console.error("Couldn't retrieve stacks: " + error);
  }
}
