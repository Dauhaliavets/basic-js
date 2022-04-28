const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 *
 * @example
 *
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
	
	calculateDepth(arr) {
		let countCallRecursion = 0;
		let filteredArr;

		function recursion(arr) {
			countCallRecursion++;
			filteredArr = arr.filter((el) => Array.isArray(el));
			if (filteredArr.length > 0) {
				return recursion(arr.flat());
			} else {
				return countCallRecursion;
			}
		}

		let depth = recursion(arr);
		return depth;
	}
}

module.exports = {
	DepthCalculator,
};
