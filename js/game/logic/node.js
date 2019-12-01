class Node {
  constructor(state, r, c, game) {
    this.initMembers(r, c, game)
    this.initState(state)
  }

  initMembers = (r, c, game) => {
    const { width, height } = getTileDimensions()
    this.tileWidth = width
    this.tileHeight = height

    this.r = r
    this.c = c

    this.game = game

    this.x = this.c * width
    this.y = this.r * height

    this.gCost = 0
    this.hCost = 0

    this.parent = null

    this.isSpawner = false
    this.walkable = true

    this.graphics = new PIXI.Graphics()
  }

  initState = state => {
    this.color = BACKGROUND_COLOR

    switch (state) {
      case WALL_STATE:
        this.walkable = false
        this.color = WALL_COLOR
        break
      case FOOD_STATE:
        this.walkable = true
        this.isFood = true
        this.color = FOOD_COLOR
        break
      case BORDER_STATE:
        this.walkable = false
        this.isBorder = true
        this.color = BORDER_COLOR
        break
      case SPAWNER_STATE:
        this.walkable = false
        this.isSpawner = true
        this.color = SPAWNER_COLOR
        break
      case GHOST_HOUSE_STATE:
        this.isSpawner = true
        break
      case GHOST_KILLER_STATE:
        this.isKiller = true
        this.color = FOOD_COLOR
        break
      case EMPTY_STATE:
        this.isEmpty = true
        break
      default:
        break
    }

    if (this.isFood) {
      this.rigidBody = Matter.Bodies.circle(
        this.x + this.tileWidth / 2,
        this.y + this.tileHeight / 2,
        FOOD_RADIUS,
        {
          isSensor: true
        }
      )
      this.rigidBody.isFood = true
      this.rigidBody.parentRef = this
    } else if (this.isKiller) {
      this.rigidBody = Matter.Bodies.circle(
        this.x + this.tileWidth / 2,
        this.y + this.tileHeight / 2,
        KILLER_RADIUS,
        { isSensor: true }
      )
      this.rigidBody.isKiller = true
      this.rigidBody.parentRef = this
    } else if (!this.walkable) {
      this.rigidBody = Matter.Bodies.rectangle(
        this.x + this.tileWidth / 2,
        this.y + this.tileHeight / 2,
        this.tileWidth,
        this.tileHeight,
        {
          isStatic: true,
          isSensor: this.isSpawner
        }
      )
      this.rigidBody.isWall = true
      this.rigidBody.parentRef = this
    }
  }

  reset = () => {
    this.gCost = 0
    this.hCost = 0

    this.parent = null

    this.game.getStage().addChild(this.nodeSprite)
    if (!this.isFood) {
      Matter.World.add(this.game.physicsEngine.world, this.rigidBody)
    }

    this.hasBeenEaten = false
  }

  update = () => {}

  draw = () => {
    if ((!this.isFood && !this.isKiller) || this.isEmpty) return
    if (this.isFood) {
      this.graphics.beginFill(this.color, 1)
      this.graphics.lineStyle(2, this.color, 1)
      this.graphics.drawCircle(0, 0, FOOD_RADIUS)
    } else if (this.isKiller) {
      this.graphics.beginFill(this.color, 1)
      this.graphics.drawCircle(0, 0, KILLER_RADIUS)
    }
    this.graphics.endFill()

    this.nodeSprite = new PIXI.Sprite(graphicsToTexture(this.graphics, this.game.getRenderer()))

    if (this.isFood) {
      this.nodeSprite.x = this.x + this.tileWidth / 2 - FOOD_RADIUS / 2
      this.nodeSprite.y = this.y + this.tileHeight / 2 - FOOD_RADIUS / 2
    } else if (this.isKiller) {
      this.nodeSprite.x = this.x + this.tileWidth / 2 - KILLER_RADIUS / 2
      this.nodeSprite.y = this.y + this.tileHeight / 2 - KILLER_RADIUS / 2
    }

    this.game.getStage().addChild(this.nodeSprite)
  }

  eaten = () => {
    if (this.hasBeenEaten) return

    this.hasBeenEaten = true
    this.game.getStage().removeChild(this.nodeSprite)

    if (!this.isFood) Matter.Composite.remove(this.game.physicsEngine.world, this.rigidBody)
  }

  get fCost() {
    return this.gCost + this.hCost
  }
}
