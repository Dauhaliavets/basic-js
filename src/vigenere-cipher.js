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
	constructor(bool) {
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.machine = bool;
    this.message = "";
    this.key = "";
    this.squareVigenere = [];
    this.newMessage = "";
  }
	generateSquareVigener() {
    let alphabetArr = this.alphabet.split("");
    for (let i = 0; i < this.alphabet.length; i++) {
      this.squareVigenere.push([
        ...alphabetArr.slice(i),
        ...alphabetArr.slice(0, i)
      ]);
    }
  }
	isCorrectArgs() {
    if (!!this.message && !!this.key) {
      return true;
    } else {
      return false;
    }
  }
  transformArgs() {
    this.message = this.message.toUpperCase();
    let repeatCountKey = Math.ceil(this.message.length / this.key.length);
    this.key = this.key
      .toUpperCase()
      .repeat(repeatCountKey)
      .slice(0, this.message.length);
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
			this.newMessage = '';
      return encrypted;
    } else {
      throw new Error("Incorrect arguments!");
    }
  }
  decrypt(message, key) {
		this.message = message;
    this.key = key;
    if (this.isCorrectArgs()) {
      console.log("Correct argements");

			// TODO: implement decrypt

    } else {
      throw new Error("Incorrect arguments!");
    }
  }
}

module.exports = {
  VigenereCipheringMachine
};
