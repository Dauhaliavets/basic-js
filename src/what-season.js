const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 *
 */
function getSeason(date) {
	if (!date) {
		return 'Unable to determine the time of year!';
	}

	if (date.constructor !== Date.prototype.constructor) {
		throw new Error('Invalid date!');
	}

	for (let key in date) {
		if (!Object.getOwnPropertyNames(key).includes('getUTCFullYear')) {
			throw new Error('Invalid date!');
		}
	}

	const seasons = ['winter', 'spring', 'summer', 'autumn'];

	let month = date.getMonth();
	if ((month >= 0 && month < 2) || month === 11) {
		return seasons[0];
	}
	if (month > 1 && month < 5) {
		return seasons[1];
	}
	if (month > 4 && month < 8) {
		return seasons[2];
	}
	if (month > 7 && month < 11) {
		return seasons[3];
	}
}

module.exports = {
	getSeason,
};
