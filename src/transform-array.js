const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
	const discardNext = '--discard-next';
	const discardPrev = '--discard-prev';
	const doubleNext = '--double-next';
	const doublePrev = '--double-prev';
	const newArr = [];
	let isDiscard = false;

	if (!Array.isArray(arr)) {
		throw new Error("'arr' parameter must be an instance of the Array!");
	}

	for (let i = 0; i < arr.length; i++) {
		let cur = arr[i];
		let prev = arr[i - 1];
		let next = arr[i + 1];

		switch (cur) {
			case discardNext:
				if (next !== undefined) {
					i += 1;
				}
				isDiscard = true;
				break;

			case discardPrev:
				if (prev !== undefined) {
					if (!isDiscard || prev === newArr[newArr.length - 1]) {
						newArr.pop();
					}
				}
				isDiscard = !isDiscard;
				break;

			case doubleNext:
				if (next !== undefined) {
					newArr.push(next);
					newArr.push(next);
					i += 1;
					isDiscard = true;
				}
				break;

			case doublePrev:
				if (prev !== undefined) {
					if (!isDiscard) {
						newArr.push(prev);
						newArr.push(prev);
					} else if (prev === newArr[newArr.length - 1]) {
						newArr.push(prev);
					}
				}
				isDiscard = false;
				break;

			default:
				newArr.push(arr[i]);
				isDiscard = false;
				break;
		}
	}

	return newArr;
}

module.exports = {
	transform,
};
