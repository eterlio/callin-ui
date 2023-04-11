interface IObject {
  [key: string]: any;
}
function getObjectDifference(
  baseObject: IObject,
  objectToCompare: IObject,
  fieldsToIgnore: string[]
) {
  const difference: IObject = {};
  for (const key in baseObject) {
    if (!fieldsToIgnore.includes(key)) {
      if (typeof baseObject[key] === "object") {
        const nestedDifference = getObjectDifference(
          baseObject[key],
          objectToCompare[key],
          fieldsToIgnore
        );
        if (Object.keys(nestedDifference).length > 0) {
          difference[key] = nestedDifference;
        }
      } else {
        if (baseObject[key] !== objectToCompare[key]) {
          difference[key] = objectToCompare[key];
        }
      }
    }
  }
  return difference;
}
