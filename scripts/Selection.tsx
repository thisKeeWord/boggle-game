import React, {
  Dispatch, FunctionComponent, SetStateAction, useEffect,
} from 'react'
import $ from 'jquery'

let board

interface SelectionProps {
  stash: Set<any>
  gameStatus: boolean
  setSelected: Dispatch<SetStateAction<string>>
  selected: string
  // eslint-disable-next-line no-unused-vars
  pushFound: (newWord: any) => void
  letters: string[]
}

const Selection: FunctionComponent<SelectionProps> = (props: SelectionProps) => {
  useEffect(() => {
    board = $('#board')
  }, [])

  useEffect(() => {
    board.find('button').removeClass('active')
    pressSelection(props.selected)
  }, [props])

  const selectWord = (e) => {
    e.preventDefault()
    const selected = e.target.value
    props.setSelected(selected)
  }

  console.log(props.letters, 'ketters')

  const boardHasWord = (e) => {
    e.preventDefault()
    const word = e.target.word.value.toUpperCase()
    if ([...props.stash].includes(word)) {
      e.target.word.value = ''
      props.pushFound(word)
      props.setSelected('')
    }
  }

  const pushLetter = (e) => {
    const char = e.target.innerText
    const input = document.getElementById('word-input') as HTMLInputElement
    if (input) {
      input.value += char
      const event = new Event('input', { bubbles: true })
      input.dispatchEvent(event)
    }
  }

  const pressSelection = (target) => {
    target = target.toUpperCase().replace('QU', 'Q')
    const visited = [
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
      const button = board.find(`[data-row=${y}][data-col=${x}]`)
      path = path.concat(button[0])
      let nextChar = button.text()
      nextChar = nextChar === 'Qu' ? 'Q' : nextChar
      word += nextChar
      if (depth === target.length - 1) { return word === target ? highlight(path) : false }
      if (nextChar !== target[depth]) { return false }
      visited[y][x] = true
      if (has(y - 1, x - 1) && !visited[y - 1][x - 1]) { search(y - 1, x - 1, word, path, depth + 1) }
      if (has(y - 1, x) && !visited[y - 1][x]) { search(y - 1, x, word, path, depth + 1) }
      if (has(y - 1, x + 1) && !visited[y - 1][x + 1]) { search(y - 1, x + 1, word, path, depth + 1) }
      if (has(y, x - 1) && !visited[y][x - 1]) { search(y, x - 1, word, path, depth + 1) }
      if (has(y, x + 1) && !visited[y][x + 1]) { search(y, x + 1, word, path, depth + 1) }
      if (has(y + 1, x - 1) && !visited[y + 1][x - 1]) { search(y + 1, x - 1, word, path, depth + 1) }
      if (has(y + 1, x) && !visited[y + 1][x]) { search(y + 1, x, word, path, depth + 1) }
      if (has(y + 1, x + 1) && !visited[y + 1][x + 1]) { search(y + 1, x + 1, word, path, depth + 1) }
      visited[y][x] = false
    }

    function has(y, x) {
      return x >= 0 && x < 5 && y >= 0 && y < 5
    }
  }

  const highlight = (path) => {
    $(path).addClass('active')
  }

  const buttons: any[] = []
  let inputForm = (<div />)
  for (let i = 0; i < 25; i++) {
    buttons.push(
      <button
        className="btn btn3d btn-white letter"
        key={i}
        data-row={Math.floor(i / 5)}
        data-col={i % 5}
        onClick={pushLetter}
      >
        {props.letters[i] === 'Q' ? 'Qu' : props.letters[i]}

      </button>,
    )
  }
  if (!props.gameStatus) {
    inputForm = (
      <form id="word-form" onSubmit={boardHasWord} className="animated slideInLeft">
        <input id="word-input" type="text" name="word" pattern="[a-zA-Z]+" placeholder="Type words here" onChange={selectWord} autoFocus />
        <button type="submit" style={{ marginLeft: '10px' }}>Submit</button>
      </form>
    )
  }

  return (
    <div>
      <div id="board">
        {buttons}
      </div>
      { inputForm}
    </div>
  )
}

export default Selection
