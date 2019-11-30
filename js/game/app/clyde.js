class Clyde extends Ghost {
  constructor(game, textures, x, y) {
    super(game, textures, x, y)

    this.targetNode = null
  }

  getTargetNode = () => {
    if (this.targetNode === null || this.targetNode === this.getCurrentNode()) {
      this.targetNode = this.getNewTargetNode()
    }

    return this.targetNode
  }

  getNewTargetNode = () => {
    return this.game.world.getRandomGroundNode()
  }
}
