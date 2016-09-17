'use strict';

const readline = require('readline');
const fs = require('fs');
const Trie = require('./trie');
const DICE = require('./dice');


const english = new Trie; // store all words in a trie
let loadedEnglish = false; // flag for whether or not we're done loading english.txt

const lineReader = readline.createInterface({ // stream in each word
  input: fs.createReadStream(__dirname + '/../english.txt')
});

lineReader.on('line', line => { // add each english words to the trie
  english.add(line.trim());
});

lineReader.on('close', () => loadedEnglish = true);

/** Class representing a Boggle board. */
class Boggle {

  /**
   * Create an NxN board.
   * @param {string|number} [boardParam=4] - Either a string with the board's letters (left-to-right top-to-bottom), or a size N.
   */
  constructor(boardParam) {

    let letters;
    if (boardParam && boardParam.constructor === String) {
      letters = boardParam.toUpperCase();
      let len = letters.length;
      if (!letters.match(/^[a-z]+$/i)) {
        throw new Error('Invalid characters. Only A-Z allowed.');
      }
      if (!isPerfectSquare(len)) {
        let squares = nearestSquares(len);
        throw new Error(`Need letters to fill a square board. Has ${len} and either needs ${len - squares[0]} less or ${squares[1] - len} more.`);
      }
      this.size = Math.sqrt(len);
    } else {
      if (boardParam < 4) {
        throw new Error('Board size must be 4x4 or greater.');
      }
      if (boardParam > 6) {
        throw new Error('No dice for board greater than 6x6.');
      }
      this.size = boardParam || 4;
    }

    this.board = [];
    this.words = [];
    var that = this;

    let dice;
    if (!letters) {
      dice = DICE[that.size].slice();
    }
    function roll() {
      let diceIndex = Math.floor(Math.random() * dice.length);
      let die = dice.splice(diceIndex, 1)[0];
      let stringIndex = Math.floor(Math.random() * die.length);
      return die[stringIndex];
    }

    for (let i = 0; i < this.size; i++) {
      let row = [];
      for (let j = 0; j < this.size; j++) {
        if (letters)
          row.push(letters[i * this.size + j]); // read the letters if any were supplied
        else
          row.push(roll()); // otherwise, roll the dice!
      }
      this.board.push(row);
    }
  }

  /**
   * Format the board as a string and write to stdout.
   */
  print() {
    console.log(this.toString());
    return this;
  }

  /**
   * Convert the board to a string.
   */
  toString() {
    var that = this;
    function topDivider() {
      let str = '┌';
      for (let i = 0; i < that.size - 1; i++) {
        str += '───┬';
      }
      return str + '───┐\n';
    }
    function numbersRow() {
      let str = '│';
      for (let i = 0; i < that.size; i++) {
        str += ' % │';
      }
      return str + '\n';
    }
    function midDivider() {
      let str = '├';
      for (let i = 0; i < that.size - 1; i++) {
        str += '───┼';
      }
      return str + '───┤\n';
    }
    function bottomDivider() {
      let str = '└';
      for (var i = 0; i < that.size - 1; i++) {
        str += '───┴';
      }
      return str + '───┘\n';
    }

    let boardStr = topDivider();
    for (var i = 0; i < this.size - 1; i++) {
      boardStr += numbersRow() + midDivider();
    }
    boardStr += numbersRow() + bottomDivider();

    // fill in the boardStr with the letters
    this.board.forEach(row => {
      row.forEach(char => {
        if (char === 'Q') {
          boardStr = boardStr.replace('% ', 'Qu');
        } else {
          boardStr = boardStr.replace('%', char);
        }
      });
    });
    return boardStr;
  }

  /**
   * Finds all English words in the board.
   * @param {Boggle~solveCallback} done - Callback to run when done solving.
   */
  solve(done) {
    if (loadedEnglish) { // begin solving if we have loaded english.txt
      this._solve(done);
    } else { // if english.txt hasn't loaded into the trie yet, wait until it has
      lineReader.on('close', this._solve.bind(this, done));
    }
    return this;
  }
  /**
   * Callback to run when done solving.
   * @callback Boggle~solveCallback
   * @param {array} words - Array of the words in the board.
   */

  _solve(done) {
    let that = this;
    let visited = falseSquareArray(this.size);

    for (let x = 0; x < this.size; x++) {  // begin a path at each position on the grid
      for (let y = 0; y < this.size; y++) {
        visit(y, x, '');
      }
    }

    function visit(y, x, word) {
      let letter = that.board[y][x];
      word += (letter === 'Q' ? 'QU' : letter); // account for the "Qu" die
      if (english.contains(word)) { // if its a valid english word, add it to the array
        that.words.push(word);
      }
      if (!english.isPrefix(word)) { // if that is not a potential prefix for a valid english word, stop
        return;
      }
      visited[y][x] = true; // mark this space as visited
      if (that._has(y - 1, x - 1) && !visited[y - 1][x - 1]) { // TODO: find a better way to do this that doesn't involve the unecessary creation of another array
        visit(y - 1, x - 1, word);
      }
      if (that._has(y - 1, x) && !visited[y - 1][x]) {
        visit(y - 1, x, word);
      }
      if (that._has(y - 1, x + 1) && !visited[y - 1][x + 1]) {
        visit(y - 1, x + 1, word);
      }
      if (that._has(y, x - 1) && !visited[y][x - 1]) {
        visit(y, x - 1, word);
      }
      if (that._has(y, x + 1) && !visited[y][x + 1]) {
        visit(y, x + 1, word);
      }
      if (that._has(y + 1, x - 1) && !visited[y + 1][x - 1]) {
        visit(y + 1, x - 1, word);
      }
      if (that._has(y + 1, x) && !visited[y + 1][x]) {
        visit(y + 1, x, word);
      }
      if (that._has(y + 1, x + 1) && !visited[y + 1][x + 1]) {
        visit(y + 1, x + 1, word);
      }
      visited[y][x] = false; // unmark this as visited so other paths can visit it
    }

    let uniqWords = Array.from(new Set(this.words)); // convert from array to set and back to array to enforce uniqueness
    uniqWords.sort((a, b) => { // sort primarily by length, secondarily by first letter alphabetically
      return (a.length - b.length) * 1000 + (a.charCodeAt(0) - b.charCodeAt(0));
    });

    this.words = uniqWords;
    if (done) {
      process.nextTick(done, uniqWords);
    }
  }

  /**
   * Finds one English word in the board.
   * @param {string} target - Word to search for in the board.
   * @param {Boggle~containsCallback} done - Callback to run when done verifying.
   */
  contains(target, done) {
    if (loadedEnglish) { // begin solving if we have loaded english.txt
      this._contains(target, done);
    } else { // if english.txt hasn't loaded into the trie yet, wait until it has
      lineReader.on('close', this._contains.bind(this, target, done));
    }
    return this;
  }
  /**
   * Callback to run when done verifying.
   * @callback Boggle~containsCallback
   * @param {boolean} found - Whether or not the word was found in the board.
   */

  _contains(target, done) {
    if (target.length < 3) {
      return done(false);
    }
    if (!english.contains(target)) {
      return done(false);
    }
    target = target.toUpperCase();
    let that = this;
    let found = false;
    let visited = falseSquareArray(this.size);
    for (let x = 0; x < this.size; x++) {  // begin a path at each position on the grid
      for (let y = 0; y < this.size; y++) {
        found || visit(y, x, ''); // the logical OR will prevent "visit" from being called again if "found" ever becomes true in order to avoid unecessary checking
      }
    }
    return done(found);

    function visit(y, x, word) {
      word += that.board[y][x];
      let i = word.length - 1;
      if (word[i] !== target[i]){
        return;
      }
      if (word.length === target.length) {
        return found = true;
      }
      visited[y][x] = true;
      if (that._has(y - 1, x - 1) && !visited[y - 1][x - 1]) {
        visit(y - 1, x - 1, word);
      }
      if (that._has(y - 1, x) && !visited[y - 1][x]) {
        visit(y - 1, x, word);
      }
      if (that._has(y - 1, x + 1) && !visited[y - 1][x + 1]) {
        visit(y - 1, x + 1, word);
      }
      if (that._has(y, x - 1) && !visited[y][x - 1]) {
        visit(y, x - 1, word);
      }
      if (that._has(y, x + 1) && !visited[y][x + 1]) {
        visit(y, x + 1, word);
      }
      if (that._has(y + 1, x - 1) && !visited[y + 1][x - 1]) {
        visit(y + 1, x - 1, word);
      }
      if (that._has(y + 1, x) && !visited[y + 1][x]) {
        visit(y + 1, x, word);
      }
      if (that._has(y + 1, x + 1) && !visited[y + 1][x + 1]) {
        visit(y + 1, x + 1, word);
      }
      visited[y][x] = false;
    }
  }

  // returns true if the given coordinate is inside the board
  _has(y, x) {
    return x >= 0 && x < this.size &&
           y >= 0 && y < this.size;
  }

}


module.exports = Boggle;

function isPerfectSquare(num) {
  let root = Math.sqrt(num);
  return Math.round(root) === root;
}

function nearestSquares(num) {
  let root = Math.sqrt(num);
  return [Math.pow(Math.floor(root), 2), Math.pow(Math.ceil(root), 2)];
}

function falseSquareArray(size) {
  var row = Array(size).fill(false); // makes an array of length "size" with every element being false
  var grid = [];
  for (var i = 0; i < size; i++) {
    grid.push(row.slice());
  }
  return grid;
}
// looks something like this
// [
//   [false, false, false, false],
//   [false, false, false, false],
//   [false, false, false, false],
//   [false, false, false, false],
// ]
