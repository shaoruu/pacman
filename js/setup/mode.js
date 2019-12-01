const onePlayerDOM = document.getElementById('player')
const twoPlayersDOM = document.getElementById('players')
const infoDOM = document.getElementById('info')

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

    infoDOM.innerHTML = ''
    localStorage.setItem('mode', TWO_PLAYERS_MODE)

    modeIndex = 1
  }
}

selectModeDown.release = switcher
selectModeUp.release = switcher

const goToGame = () => {
  window.location.href = './pages/game.html'
}

const comingSoon = () => {
  infoDOM.innerHTML = 'coming soon...'
  setTimeout(() => (infoDOM.innerHTML = ''), 1000)
}

enter.press = () => {
  if (modeIndex === 1) goToGame()
  else comingSoon()
}

onePlayerDOM.addEventListener('click', goToGame, false)
twoPlayersDOM.addEventListener('click', comingSoon, false)

switcher()
