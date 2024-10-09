export async function fetchAllStacks() {
  let res;

  try {
    res = await fetch("api/stacks", { method: "GET" });

    if (res.ok) {
      return await res.json();
    } else {
      throw new Error("Something went wrong while loading stacks.");
    }
  } catch (error) {
    console.error("Couldn't retrieve stacks: " + error);
  }
}

export async function createStack() {
  let res;

  try {
    res = await fetch("api/stacks", {
      method: "POST",
      headers: {
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify(res),
    });

    if (res.ok) {
      return await res.json();
    } else {
      throw new Error("Something went wrong while creating a new stack.");
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * DELETE CARD
 * @param id
 * @returns updated JSON
 */
export const deleteStack = async (id: string) => {
  await fetch(`/api/stack/${id}`, {
    method: "DELETE",
  });
};
