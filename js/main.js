PIXI.loader
  .add('../assets/Pacman.json')
  .add('../assets/maze.png')
  .load(setup)

function setup() {
  const spritesheet = PIXI.loader.resources['../assets/Pacman.json']
  const slide = background(
    { x: gameDOM.offsetWidth, y: gameDOM.offsetHeight },
    new PIXI.Sprite.fromImage('../assets/maze.png'),
    'cover'
  )

  new Game(spritesheet, slide)
}
