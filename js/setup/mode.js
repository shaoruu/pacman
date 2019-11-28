const onePlayerDOM = document.getElementById('1player')
const twoPlayersDOM = document.getElementById('2players')

const selectModeUp = keyboard('ArrowUp')
const selectModeDown = keyboard('ArrowDown')

const enter = keyboard('Enter')

let modeIndex

const ONE_PLAYER_MODE = 'one player'
const TWO_PLAYERS_MODE = 'two players'

const switcher = () => {
  if (modeIndex === 1) {
    onePlayerDOM.classList.remove('selected')
    twoPlayersDOM.classList.add('selected')

    localStorage.setItem('mode', ONE_PLAYER_MODE)

    modeIndex = 2
  } else {
    onePlayerDOM.classList.add('selected')
    twoPlayersDOM.classList.remove('selected')

    localStorage.setItem('mode', TWO_PLAYERS_MODE)

    modeIndex = 1
  }
}

selectModeDown.release = switcher
selectModeUp.release = switcher

enter.press = () => {
  window.location.href = './pages/game.html'
}

switcher()
