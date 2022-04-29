const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
	constructor(bool = true) {
		this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		this.machine = bool;
		this.message = '';
		this.key = '';
		this.squareVigenere = [];
		this.newMessage = '';
	}
	generateSquareVigener() {
		let alphabetArr = this.alphabet.split('');
		for (let i = 0; i < this.alphabet.length; i++) {
			this.squareVigenere.push([
				...alphabetArr.slice(i),
				...alphabetArr.slice(0, i),
			]);
		}
	}
	isCorrectArgs() {
		if ((!!this.message || !!this.newMessage) && !!this.key) {
			return true;
		} else {
			return false;
		}
	}
	transformArgs() {
    let repeatCountKey;
    let length;
    if(this.message.length) {
      this.message = this.message.toUpperCase();
			this.newMessage ='';
      repeatCountKey = Math.ceil(this.message.length / this.key.length) + 1;
      length = this.message.length;
    } else if (this.newMessage.length) {
      this.newMessage = this.newMessage.toUpperCase();
			this.message = '';
      repeatCountKey = Math.ceil(this.newMessage.length / this.key.length) + 1;
      length = this.newMessage.length;
    }
    this.key = this.key
      .toUpperCase()
      .repeat(repeatCountKey)
      .slice(0, length);
  }
	encrypt(message, key) {
    this.message = message;
    this.key = key; 
    if (this.isCorrectArgs()) {
      this.transformArgs();
      this.generateSquareVigener();
      let offsetY = 0;
      for (let i = 0; i < this.message.length; i++) {
        let indX = this.alphabet.indexOf(this.message[i]);
        if (indX !== -1) {
          let indY = this.alphabet.indexOf(this.key[i - offsetY]);
          this.newMessage += this.squareVigenere[indX][indY];
        } else {
          offsetY++;
          this.newMessage += this.message[i];
        }
      }
      const encrypted = this.newMessage;
			this.message = "";
			this.key = "";
      this.newMessage = "";
			if(this.machine) {
				return encrypted;
			} else {
				return encrypted.split('').reverse().join('');
			}
    } else {
      throw new Error("Incorrect arguments!");
    }
  }
	decrypt(message, key) {
		this.newMessage = message;
		this.key = key;
		if (this.isCorrectArgs()) {
			this.transformArgs();
			this.generateSquareVigener();
			let offsetY = 0;
			for (let i = 0; i < this.newMessage.length; i++) {
				let indRow = this.alphabet.indexOf(this.key[i - offsetY]);
				let indCol = this.squareVigenere[indRow].indexOf(this.newMessage[i]);
				if (indCol !== -1) {
					this.message += this.squareVigenere[0][indCol];
				} else {
					offsetY++;
					this.message += this.newMessage[i];
				}
			}
			const decrypted = this.message;
			this.message = "";
			this.key = "";
      this.newMessage = "";
			if(this.machine) {
				return decrypted;
			} else {
				return decrypted.split('').reverse().join('');
			}
		} else {
			throw new Error('Incorrect arguments!');
		}
	}
}

module.exports = {
	VigenereCipheringMachine,
};
