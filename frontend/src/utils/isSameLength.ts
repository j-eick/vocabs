export default function isSameLength(localsS: object[], mongoDB: object[]): boolean {
  const dbDataLength = JSON.stringify(mongoDB).length;
  const lsDataLength = JSON.stringify(localsS).length;
  console.log("DB-Length: " + dbDataLength);
  console.log("LS-Length: " + lsDataLength);
  if (dbDataLength === lsDataLength) {
    return true;
  } else {
    return false;
  }
}
