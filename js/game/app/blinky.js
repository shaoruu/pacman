class Blinky extends Ghost {
  constructor(game, textures, x, y) {
    super(game, textures, x, y)

    this.home = game.world.getNodeFromXY(
      INKY_INIT_X * this.tileWidth,
      INKY_INIT_Y * this.tileHeight
    )
  }

  getTargetNode = () => {
    return this.game.player.currNode
  }
}
