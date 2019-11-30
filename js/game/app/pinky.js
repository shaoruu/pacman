class Pinky extends Ghost {
  constructor(game, textures, x, y) {
    super(game, textures, x, y)
  }

  getTargetNode = () => {
    return this.game.player.ambushNode
  }
}
