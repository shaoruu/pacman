const onePlayerDOM = document.getElementById('player')
const instructionsDOM = document.getElementById('instructions')

const selectModeUp = keyboard('ArrowUp')
const selectModeDown = keyboard('ArrowDown')

const enter = keyboard('Enter')

let index

const switcher = () => {
  if (index === 1) {
    onePlayerDOM.classList.remove('selected')
    instructionsDOM.classList.add('selected')

    index = 2
  } else {
    onePlayerDOM.classList.add('selected')
    instructionsDOM.classList.remove('selected')

    index = 1
  }
}

selectModeDown.release = switcher
selectModeUp.release = switcher

const goToGame = () => {
  window.location.href = './pages/game.html'
}

const goToInstructions = () => {
  window.location.href = './pages/instructions.html'
}

enter.press = () => {
  if (index === 1) goToGame()
  else goToInstructions()
}

onePlayerDOM.addEventListener('click', goToGame, false)
instructionsDOM.addEventListener('click', goToInstructions, false)

switcher()
