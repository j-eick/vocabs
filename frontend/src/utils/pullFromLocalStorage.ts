export default function pullFromLocalStorage(collection: string) {
  // check localstorage for cards
  try {
    const pullFromLS = localStorage.getItem(collection);
    if (pullFromLS) {
      return JSON.parse(pullFromLS);
    } else {
      console.log("Collection doesn't exist");

      return null;
    }
  } catch (err) {
    console.error(err);
  }
}
