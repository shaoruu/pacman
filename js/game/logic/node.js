class Node {
  constructor(state, r, c) {
    this.initMembers(r, c)
    this.initState(state)
  }

  initMembers = (r, c) => {
    const { width, height } = getTileDimensions()
    this.tileWidth = width
    this.tileHeight = height

    this.r = r
    this.c = c

    this.x = this.c * width
    this.y = this.r * height

    this.gCost = 0
    this.hCost = 0

    this.parent = null

    this.isSpawner = false
    this.walkable = true
  }

  initState = state => {
    this.color = BACKGROUND_COLOR

    switch (state) {
      case WALL_STATE:
        this.walkable = false
        this.color = WALL_COLOR
        break
      case BORDER_STATE:
        this.walkable = false
        this.color = BORDER_COLOR
        break
      case SPAWNER_STATE:
        this.walkable = false
        this.isSpawner = true
        this.color = SPAWNER_COLOR
        break
      default:
        break
    }

    if (!this.walkable) {
      this.rigidBody = Matter.Bodies.rectangle(
        this.x + this.tileWidth / 2,
        this.y + this.tileHeight / 2,
        this.tileWidth,
        this.tileHeight,
        {
          isStatic: true
        }
      )

      if (!this.isSpawner) {
        this.rigidBody.isWall = true
      }
    }
  }

  reset = () => {
    this.gCost = 0
    this.hCost = 0

    this.parent = null
  }

  update = () => {}

  draw = graphics => {
    // if (this.walkable) graphics.lineStyle(0)
    // else graphics.lineStyle(2, TILE_OUTLINE_COLOR, 1)
    graphics.beginFill(this.color)
    graphics.drawRect(
      this.x,
      this.y,
      this.tileWidth,
      this.isSpawner ? this.tileHeight * 0.3 : this.tileHeight
    )
    graphics.endFill()
  }

  get fCost() {
    return this.gCost + this.hCost
  }
}
