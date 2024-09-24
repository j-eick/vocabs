export default function pullFromLocalStorage(collection: string) {
  // check localstorage for cards
  try {
    const data = localStorage.getItem(collection);
    // collection exists + array is NOT empty
    if (data == null) {
      throw new Error("Collection is null.");
    } else if (!data.length) {
      console.warn("Collection is empty!");
      return [];
    } else if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}
