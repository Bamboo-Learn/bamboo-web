
export const isSet = (variable) => {
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

export const strCompare = (a, b) => {
	if (a < b) {
		return -1;
	}
	if (a > b) {
		return 1;
	}
	return 0;
}