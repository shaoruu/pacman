class Blinky extends Ghost {
  constructor(game, textures, x, y) {
    super(game, textures, x, y)
    console.log(this.sprite)
  }

  updateMovements = delta => {
    const currNode = this.game.world.getNodeFromXY(this.x, this.y)
    const targetNode = this.game.world.getNodeFromXY(this.game.player.x, this.game.player.y)
    const nextNode = Pathfinder.findAstarPath(this.game, currNode, targetNode)
    if (!nextNode) return

    const { x, y } = nextNode
    const dir = { x: x - this.x + this.tileWidth / 2, y: y - this.y + this.tileHeight / 2 }

    const aBar = Math.sqrt(dir.x ** 2 + dir.y ** 2)
    dir.x /= aBar
    dir.y /= aBar

    Matter.Body.setVelocity(this.rigidBody, {
      x: dir.x * delta * GHOST_ACCELERATION,
      y: dir.y * delta * GHOST_ACCELERATION
    })

    this.checkDirection(dir)
  }

  update = delta => {
    this.updateMovements(delta)

    const { x, y } = this.rigidBody.position

    this.sprite.x = x
    this.sprite.y = y

    this.x = x
    this.y = y
  }
}
