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

// TODO: createStack needs to be passed the newStack; need to create stack via form/dropdown
export async function createStack() {
    let res;

    try {
        res = await fetch("api/stacks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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

export const renameStack = async (stackID: string, newName: string) => {
    let res;

    try {
        res = await fetch(`/api/stacks/${stackID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newName }),
        });

        if (!res) {
            throw new Error("Errow while changing collection-name.");
        }

        return await res.json();
    } catch (error) {
        console.error(error);
    }
};

/**
 * DELETE CARD
 * @param stackID
 * @returns updated JSON
 */
export const deleteStack = async (stackID: string) => {
    await fetch(`/api/stacks/${stackID}`, {
        method: "DELETE",
    });
};

/**
 * DELETE CARD
 * @param stackID
 * @returns updated JSON
 */
export const deleteStackWithCards = async (stackID: string, inclCards: boolean) => {
    await fetch(`/api/stacks/${stackID}?withCards=${inclCards}`, {
        method: "DELETE",
    });
};
