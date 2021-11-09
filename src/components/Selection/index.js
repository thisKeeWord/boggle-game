import React, { Component } from 'react'
const $ = require('jquery')

import './styles.scss'

let $board

export default class Selection extends Component {
  componentDidMount() {
    $board = $('.board')
  }

  componentWillReceiveProps(props) {
    $board.find('.board-letter').removeClass('active')
    this.pressSelection(props.selected)
  }

  selectWord = (e) => {
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
    let char = e.target.innerText
    let input = document.getElementById('word-input')

    setNativeValue(input, input.value + char)
    input.dispatchEvent(new Event('input', { bubbles: true }))
  }

  validateKey = (e) => {
    if (!e.key.match(/[a-z]/i)) {
      e.preventDefault()
    }
  }

  clearSelection = (e) => {
    let input = document.getElementById('word-input')

    setNativeValue(input, '')
    input.dispatchEvent(new Event('input', { bubbles: true }))
    this.props.setSelected('')
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
      let $button = $board.find('[data-row=' + y + '][data-col=' + x + ']')
      path = path.concat($button[0])
      let nextChar = $button.text()
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

  checkIfEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.refs.form.dispatchEvent(new Event("submit"))
    }
  }

  render() {
    const upperCased = this.props.selected.toUpperCase()
    // question mark
    let wordStatus = (
      <span className="input-group-addon info">...</span>
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
      <div className="yo">
        <div className="board">
          {[...Array(25)].map((el, i) => {
            return (
              <button
                className="btn btn3d btn-white letter board-letter"
                key={i}
                data-row={Math.floor(i / 5)}
                data-col={i % 5}
                onClick={this.pushLetter}
                onKeyPress={this.validateKey}
              >
                {this.props.letters[i] === 'Q' ? 'Qu' : this.props.letters[i]}
              </button>
            )
          })}
        </div>

        {!this.props.gameStart ? (
          <form className="animated slideInLeft word-form" ref="form" onSubmit={this.boardHasWord}>
            <input
              id="word-input"
              type="text"
              name="word"
              placeholder="Click tiles or type here"
              onChange={this.selectWord}
              autoFocus
              autoComplete="off"
            />
            <button className="btn btn3d btn-info" type="submit" style={{ marginLeft: '10px' }}>{wordStatus}</button>
            <button className="btn btn3d btn-info clear" onClick={this.clearSelection}>Clear</button>
          </form>
        ) : (
          <div />
        )}
      </div>
    )
  }
}


function setNativeValue(element, value) {
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set
  const prototype = Object.getPrototypeOf(element)
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value)
  } else {
    valueSetter.call(element, value)
  }
}