import React, {Component} from 'react';
import $ from 'jquery';
let board;

export default class Selection extends Component {
  componentDidMount() {
    board = $('#board');
  }

  componentWillReceiveProps(props) {
    board.find('button').removeClass('active');
    this.pressSelection(props.selected);
  }

  selectWord(e) {
    e.preventDefault();
    let selected = e.target.value;
    this.props.setSelected(selected);
  }

  boardHasWord(e) {
    e.preventDefault();
    let word = e.target.word.value.toUpperCase();
    if (this.props.stash.contains(word)) {
      e.target.word.value = '';
      this.props.pushFound(word);
      this.props.setSelected('');
    }
  }

  pushLetter(e) {
    let that = this;
    let char = e.target.innerText;
    let input = document.getElementById('word-input');
    // console.log(input, "INPUT")
    input.value += char;
    let event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
    // console.log(input, "OUTPUT")
  }

  pressSelection(target) {
    target = target.toUpperCase();
    let that = this;
    let visited = [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ];
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        search(y, x, '', [], 0);
      }
    }

    function search(y, x, word, path, depth) {
      let button = board.find('[data-row='+ y +'][data-col='+ x + ']');
      path = path.concat(button[0]);
      let nextChar = button.text();
      word += nextChar;
      if (depth === target.length - 1) { return word === target ? that.highlight(path) : false }
      if (nextChar !== target[depth]) { return false }
      visited[y][x] = true;
      if (has(y - 1, x - 1) && !visited[y - 1][x - 1]) { search(y - 1, x - 1, word, path, depth + 1) }
      if (has(y - 1, x) && !visited[y - 1][x]) { search(y - 1, x, word, path, depth + 1) }
      if (has(y - 1, x + 1) && !visited[y - 1][x + 1]) { search(y - 1, x + 1, word, path, depth + 1) }
      if (has(y, x - 1) && !visited[y][x - 1]) { search(y, x - 1, word, path, depth + 1) }
      if (has(y, x + 1) && !visited[y][x + 1]) { search(y, x + 1, word, path, depth + 1) }
      if (has(y + 1, x - 1) && !visited[y + 1][x - 1]) { search(y + 1, x - 1, word, path, depth + 1) }
      if (has(y + 1, x) && !visited[y + 1][x]) { search(y + 1, x, word, path, depth + 1) }
      if (has(y + 1, x + 1) && !visited[y + 1][x + 1]) { search(y + 1, x + 1, word, path, depth + 1) }
      visited[y][x] = false;
    }

    function has(y, x) {
      return x >= 0 && x < 5 && y >= 0 && y < 5;
    }
  }

  highlight(path) {
    $(path).addClass('active');
  }

  render() {
    let buttons = [], inputForm = (<div />);
    for (let i = 0; i < 25; i++) {
      buttons.push(<button className="btn btn3d btn-white letter" key={i} data-row={Math.floor(i / 5)} data-col={i % 5} onClick={this.pushLetter}>{this.props.letters[i]}</button>);
    }
    if (!this.props.gameStatus) {
      inputForm = (
        <form id="word-form" onSubmit={this.boardHasWord.bind(this)} className="animated slideInLeft">
          <input id="word-input" type="text" name="word" pattern="[a-zA-Z]+" placeholder="Enter words here" onChange={this.selectWord.bind(this)} />
        </form>
      );
    }
    return (
      <div>
        <div id="board">
          { buttons }
        </div>
          { inputForm }
      </div>
    );
  }
}