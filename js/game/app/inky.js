class Inky extends Ghost {
  constructor(game, textures, x, y) {
    super(game, textures, x, y)
  }

  getTargetNode = () => {
    const blinkyRef = this.game.ghostsManager.blinky

    const playerNode = this.game.player.currNode
    const blinkyNode = this.game.world.getNodeFromXY(blinkyRef.x, blinkyRef.y)

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
