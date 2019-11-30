class Inky extends Ghost {
  constructor(game, textures, x, y) {
    super(game, textures, x, y)
  }

  updateMovements = delta => {
    const currNode = this.game.world.getNodeFromXY(this.x, this.y)
    const targetNode = this.getTargetNode()
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

  getTargetNode = () => {
    const blinkyRef = this.game.ghostsManager.blinky

    const playerNode = this.game.world.getNodeFromXY(this.game.player.x, this.game.player.y)
    const blinkyNode = this.game.world.getNodeFromXY(blinkyRef.x, blinkyRef.y)

    const pToBDist = this.getNodesDistance(playerNode, blinkyNode)

    const deltaX = playerNode.x - blinkyNode.x
    const deltaY = playerNode.y - blinkyNode.y

    if (deltaX === 0) return playerNode

    const slope = deltaY / deltaX
    const stepX = -this.tileWidth * Math.sign(deltaX)
    const stepY = -stepX * slope

    let target = playerNode
    let maxIteration = 20
    let i = 0

    let standX = playerNode.x + deltaX
    let standY = playerNode.y + deltaY

    while (true) {
      const newNode = this.game.world.getNodeFromXY(standX, standY)
      if (newNode && newNode.walkable) {
        target = newNode
        break
      }

      standX = standX + stepX
      standY = standY + stepY

      i++
      if (i >= maxIteration) break
    }

    return target
  }

  getNodesDistance = (node1, node2) =>
    Math.sqrt((node1.x - node2.x) ** 2 + (node1.y - node2.y) ** 2)
}
