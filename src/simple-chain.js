const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
	chain: [],
	getLength() {
		return this.chain.length;
	},
	addLink(value) {
		if (arguments) {
			this.chain.push(`( ${value} )`);
		} else {
			this.chain.push('( )');
		}
		return this;
	},
	removeLink(position) {
		if (
			Number.isInteger(position) &&
			0 < position &&
			position <= this.getLength()
		) {
			this.chain = [
				...this.chain.slice(0, position - 1),
				...this.chain.slice(position),
			];
			return this;
		} else {
			this.chain = [];
			throw new Error(`You can't remove incorrect link!`);
		}
	},
	reverseChain() {
		this.chain.reverse();
		return this;
	},
	finishChain() {
		const [resultChain] = [this.chain.join('~~')];
		this.chain = [];
		return resultChain;
	},
};

module.exports = {
	chainMaker,
};
