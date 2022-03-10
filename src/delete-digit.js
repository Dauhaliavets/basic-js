const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  let arr = n.toString().split('');
	let indDelete;

	for(let i = 0; i < arr.length; i++){
		if(i === arr.length - 1) {
			indDelete = arr.length - 1;
			break;
		}
		
		if(+arr[i] < +arr[i + 1]) {
			indDelete = i;
			break;
		}
	}

	arr.splice(indDelete, 1);
	return +arr.join('');
}

module.exports = {
  deleteDigit
};
