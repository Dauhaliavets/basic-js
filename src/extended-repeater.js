const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
	const strToStr = `${str}`;
  const repeatTimes = options.repeatTimes ? options.repeatTimes : 1;
	const separator = options.separator ? options.separator.toString() : '+';

	const addition = (options.addition === undefined) ? '' : `${options.addition}`;
	const additionRepeatTimes = options.additionRepeatTimes ? options.additionRepeatTimes : 1;
	const additionSeparator = options.additionSeparator ? options.additionSeparator.toString() : '|';


	let additionArray = new Array(additionRepeatTimes);
	let additionStr = additionArray.fill(addition).join(`${additionSeparator}`);

	let resultArray = new Array(repeatTimes);
	let resultStr = resultArray.fill(strToStr).map(item => item.concat(additionStr)).join(`${separator}`);

	return resultStr;

}

module.exports = {
  repeater
};
