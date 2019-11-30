class Ghost {
  constructor(game, textures, x, y) {
    this.game = game

    this.x = x
    this.y = y

    const { width, height } = getTileDimensions()
    this.tileWidth = width
    this.tileHeight = height

    this.direction = this.getDirRep({ x: 1, y: 0 })

    this.initSprite(textures)
    this.initRigidBody()
  }

  initSprite = textures => {
    const { top, bottom, left, right } = textures

    this.topTextures = top
    this.bottomTextures = bottom
    this.leftTextures = left
    this.rightTextures = right

    this.sprite = new PIXI.AnimatedSprite(this.rightTextures)
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.pivot.set(0.5, 0.5)

    this.sprite.width = GHOST_SPRITE_WIDTH
    this.sprite.height = GHOST_SPRITE_WIDTH

    this.sprite.animationSpeed = 0.2
    this.sprite.play()

    this.game.getStage().addChild(this.sprite)
  }

  initRigidBody = () => {
    this.rigidBody = Matter.Bodies.circle(this.x, this.y, GHOST_WIDTH / 2, {
      friction: 1,
      inertia: Infinity
    })
    this.rigidBody.isGhost = true
    this.rigidBody.parentRef = this

    Matter.World.add(this.game.physicsEngine.world, this.rigidBody)
  }

  checkDirection = dir => {
    const fakeDir = { ...dir }
    if (Math.abs(fakeDir.x) > Math.abs(fakeDir.y)) {
      fakeDir.x = fakeDir.x / Math.abs(fakeDir.x)
      fakeDir.y = 0
    } else {
      fakeDir.x = 0
      fakeDir.y = fakeDir.y / Math.abs(fakeDir.y)
    }

    const rep = this.getDirRep(fakeDir)
    if (rep !== this.direction) {
      const { x, y } = fakeDir
      if (x > 0) this.sprite.textures = this.rightTextures
      else if (x < 0) this.sprite.textures = this.leftTextures
      else if (y < 0) this.sprite.textures = this.topTextures
      else if (y > 0) this.sprite.textures = this.bottomTextures

      this.direction = rep
    }
  }

  getDirRep = dir => `${dir.x}::${dir.y}`
}
