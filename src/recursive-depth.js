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
	countCallRecursion = 0;
	filteredArr = [];

	calculateDepth(arr) {
		this.countCallRecursion++;
		this.filteredArr = arr.filter((el) => Array.isArray(el));
		if (this.filteredArr.length) {
			return this.calculateDepth(this.filteredArr.flat());
		} else {
			let depth = this.countCallRecursion;
			this.countCallRecursion = 0;
			return depth;
		}
	}
}

module.exports = {
	DepthCalculator,
};
