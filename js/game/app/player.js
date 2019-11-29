class Player {
  constructor(game, spritesheet) {
    this.game = game
    this.spritesheet = spritesheet.spritesheet

    this.init()

    this.direction = null
  }

  init = () => {
    this.initTextures()
    this.initSFX()

    const { width, height } = getTileDimensions()
    this.tileWidth = width
    this.tileHeight = height

    this.x = (PLAYER_INIT_X + 0.5) * this.tileWidth
    this.y = (PLAYER_INIT_Y + 0.5) * this.tileHeight

    this.rigidBody = Matter.Bodies.circle(this.x, this.y, PLAYER_WIDTH / 2, {
      // slop: 0,
      friction: 1,
      inertia: Infinity
    })
    this.rigidBody.isPlayer = true
    this.rigidBody.parentRef = this

    const { x, y } = this.rigidBody.position

    this.sprite.x = x
    this.sprite.y = y

    Matter.World.add(this.game.physicsEngine.world, this.rigidBody)

    this.initListeners()
  }

  initTextures = () => {
    const spriteTextures = []
    for (let i = 61; i <= 63; i++) {
      const texture = this.spritesheet.textures[`Pacman${i}.png`]
      spriteTextures.push(texture)
    }

    this.sprite = new PIXI.AnimatedSprite(spriteTextures)
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.pivot.set(0.5, 0.5)

    this.sprite.width = PLAYER_WIDTH
    this.sprite.height = PLAYER_WIDTH

    this.sprite.animationSpeed = 0.3
    this.sprite.play()

    this.game.getStage().addChild(this.sprite)
  }

  initSFX = () => {}

  initListeners = () => {
    const up = keyboard('ArrowUp')
    const down = keyboard('ArrowDown')
    const left = keyboard('ArrowLeft')
    const right = keyboard('ArrowRight')

    up.press = () => {
      if (!this.game.world.getIsWalkable(this.sprite.x, this.sprite.y - this.tileHeight)) {
        return
      }
      this.direction = UP
      this.sprite.rotation = -Math.PI / 2
    }
    down.press = () => {
      if (!this.game.world.getIsWalkable(this.sprite.x, this.sprite.y + this.tileHeight)) {
        return
      }
      this.direction = DOWN
      this.sprite.rotation = Math.PI / 2
    }
    left.press = () => {
      if (!this.game.world.getIsWalkable(this.sprite.x - this.tileWidth, this.sprite.y)) {
        return
      }
      this.direction = LEFT
      this.sprite.rotation = -Math.PI
    }
    right.press = () => {
      if (!this.game.world.getIsWalkable(this.sprite.x + this.tileWidth, this.sprite.y)) {
        return
      }
      this.direction = RIGHT
      this.sprite.rotation = 0
    }
  }

  update = delta => {
    if (!isNaN(this.direction)) {
      switch (this.direction) {
        case UP:
          Matter.Body.setVelocity(this.rigidBody, {
            x: 0,
            y: -PLAYER_VELOCITY * delta
          })

          break
        case DOWN:
          Matter.Body.setVelocity(this.rigidBody, {
            x: 0,
            y: PLAYER_VELOCITY * delta
          })

          break
        case LEFT:
          Matter.Body.setVelocity(this.rigidBody, {
            x: -PLAYER_VELOCITY * delta,
            y: 0
          })

          break
        case RIGHT:
          Matter.Body.setVelocity(this.rigidBody, {
            x: PLAYER_VELOCITY * delta,
            y: 0
          })

          break
      }
    }

    const { x, y } = this.rigidBody.position

    this.sprite.x = x
    this.sprite.y = y
  }
}
