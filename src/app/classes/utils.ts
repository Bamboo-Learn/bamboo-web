
export const isSet = (variable: any): boolean => {
  if (!variable) return false;
  switch (typeof variable) {
    case "string":
      return variable !== '';
    case "number":
      return true;
    case "object":
      return true;
    default:
      return false;
  }
}

export const compare = (a: any, b: any): number => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}