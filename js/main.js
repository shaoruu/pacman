PIXI.loader.add('../assets/Pacman.json').load(setup)

function setup() {
  const spritesheet = PIXI.loader.resources['../assets/Pacman.json']

  new Game(spritesheet)
}
