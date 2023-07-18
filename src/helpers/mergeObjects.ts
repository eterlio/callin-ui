export function mergeObjects(...objects: any) {
  return objects.reduce((merged: any, obj: any) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          merged[key] = [...merged[key], ...obj[key]];
        } else merged[key] = { ...merged[key], ...obj[key] };
      } else if (obj[key] !== undefined && obj[key] !== "") {
        merged[key] = obj[key];
      }
    });
    return merged;
  }, {});
}
