import React, { Component } from 'react'
import $ from 'jquery'
let board

export default class Selection extends Component {
  componentDidMount() {
    board = $('#board')
  }

  componentWillReceiveProps(props) {
    board.find('button').removeClass('active')
    this.pressSelection(props.selected)
  }

  selectWord = (e) => {
    e.preventDefault()
    this.props.setSelected(e.target.value)
  }

  boardHasWord = (e) => {
    e.preventDefault()
    let word = e.target.word.value.toUpperCase()
    if (this.props.wordsCache.contains(word)) {
      e.target.word.value = ''
      this.props.pushFound(word)
      this.props.setSelected('')
    }
  }

  pushLetter = (e) => {
    const char = e.target.innerText
    let input = document.getElementById('word-input')
    input.value += char
    let event = new Event('input', { bubbles: true })
    input.dispatchEvent(event)
  }

  // find pathing
  pressSelection = (target) => {
    target = target.toUpperCase().replace('QU', 'Q')
    const that = this
    let visited = [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ]

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        search(y, x, '', [], 0)
      }
    }

    function search(y, x, word, path, depth) {
      const button = board.find('[data-row=' + y + '][data-col=' + x + ']')
      path = path.concat(button[0])
      let nextChar = button.text()
      nextChar = nextChar === 'Qu' ? 'Q' : nextChar
      word += nextChar
      if (depth === target.length - 1) {
        return word === target ? that.highlight(path) : false
      }
      if (nextChar !== target[depth]) {
        return false
      }

      visited[y][x] = true
      if (has(y - 1, x - 1) && !visited[y - 1][x - 1]) {
        search(y - 1, x - 1, word, path, depth + 1)
      }
      if (has(y - 1, x) && !visited[y - 1][x]) {
        search(y - 1, x, word, path, depth + 1)
      }
      if (has(y - 1, x + 1) && !visited[y - 1][x + 1]) {
        search(y - 1, x + 1, word, path, depth + 1)
      }
      if (has(y, x - 1) && !visited[y][x - 1]) {
        search(y, x - 1, word, path, depth + 1)
      }
      if (has(y, x + 1) && !visited[y][x + 1]) {
        search(y, x + 1, word, path, depth + 1)
      }
      if (has(y + 1, x - 1) && !visited[y + 1][x - 1]) {
        search(y + 1, x - 1, word, path, depth + 1)
      }
      if (has(y + 1, x) && !visited[y + 1][x]) {
        search(y + 1, x, word, path, depth + 1)
      }
      if (has(y + 1, x + 1) && !visited[y + 1][x + 1]) {
        search(y + 1, x + 1, word, path, depth + 1)
      }

      visited[y][x] = false
    }

    function has(y, x) {
      return x >= 0 && x < 5 && y >= 0 && y < 5
    }
  }

  highlight = (path) => {
    $(path).addClass('active')
  }

  render() {
    const upperCased = this.props.selected.toUpperCase()
    // question mark
    let wordStatus = (
      <span className="input-group-addon">&#63;</span>
    )

    // min length for word is 3
    if (upperCased.length >= 3) {
      if (this.props.wordsFound.has(upperCased)) {
        // warning sign
        wordStatus = (
          <span className="input-group-addon warn">&#9888;</span>
        )
      } else if (this.props.wordsCache.has(upperCased)) {
        // check mark
        wordStatus = (
          <span className="input-group-addon success">&#10003;</span>
        )
      }
    }

    return (
      <div>
        <div id="board">
          {[...Array(25)].map((el, i) => {
            return (
              <button
                className="btn btn3d btn-white letter"
                key={i}
                data-row={Math.floor(i / 5)}
                data-col={i % 5}
                onClick={this.pushLetter}
              >
                {this.props.letters[i] === 'Q' ? 'Qu' : this.props.letters[i]}
              </button>
            )
          })}
        </div>
        {!this.props.gameStart ? (
          <form id="word-form" onSubmit={this.boardHasWord} className="animated slideInLeft">
            <input
              id="word-input"
              type="text"
              name="word"
              placeholder="Type words here"
              onChange={this.selectWord}
              autoFocus
            />
            <button type="submit" style={{ marginLeft: '10px' }}>{wordStatus}</button>
          </form>
        ) : (
          <div />
        )}
      </div>
    )
  }
}