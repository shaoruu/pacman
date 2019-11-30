const gameDOM = document.getElementById('game-wrapper')
const scoreDOM = document.getElementById('score')
const highScoreDOM = document.getElementById('high-score')

const highScoreLocal = localStorage.getItem('high-score')
if (highScoreLocal) highScoreDOM.innerHTML = highScoreLocal
else localStorage.setItem('high-score', '0')
