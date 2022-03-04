const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
	let resMatrix = [];
	let tempArr;
	let count;
	let indFromX;
	let indFromY;
	let indToX;
	let indToY;

  for(let i = 0; i < matrix.length; i++) {
		tempArr = [];

		for(let j = 0; j < matrix[i].length; j++) {
			indFromX = (i - 1) >= 0 ? i - 1 : 0;
			indFromY = (j - 1) >= 0 ? j - 1 : 0;
			indToX = (i + 1) < matrix.length ? i + 1 : matrix.length - 1;
			indToY = (j + 1) < matrix[i].length ? j + 1 : matrix[i].length - 1;

			count = 0;

			for(let x = indFromX; x <= indToX; x++) {
				for(let y = indFromY; y <= indToY; y++) {
					if(matrix[x][y]) {
						if(x !== i || y !== j) {
							count++;
						}
					}
				}
			}

			tempArr.push(count);

		}

		resMatrix.push(tempArr);

	}

	return resMatrix;
}

module.exports = {
  minesweeper
};
