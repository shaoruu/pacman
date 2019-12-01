const gameDOM = document.getElementById('game-wrapper')
const scoreDOM = document.getElementById('score')
const highScoreDOM = document.getElementById('high-score')
const livesDOM = document.getElementById('lives')
const levelUpDOM = document.getElementById('level-up')

const highScoreLocal = localStorage.getItem('high-score')
if (highScoreLocal) highScoreDOM.innerHTML = highScoreLocal
else localStorage.setItem('high-score', '0')
