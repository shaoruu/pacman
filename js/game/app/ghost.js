class Ghost {
  constructor(game, textures, x, y) {
    this.game = game

    this.x = x
    this.y = y

    this.dead = false
    this.eaten = false
    this.isGoingHome = false

    const { width, height } = getTileDimensions()
    this.tileWidth = width
    this.tileHeight = height

    this.direction = this.getDirRep({ x: 1, y: 0 })

    this.home = this.game.world.getNodeFromXY(x, y)

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

  checkSpriteChange = dir => {
    if (this.dead && !this.eaten) return

    const eatenTextures = this.game.ghostsManager.eatenGhostTextures

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
      if (x > 0) this.sprite.textures = this.eaten ? eatenTextures.right : this.rightTextures
      else if (x < 0) this.sprite.textures = this.eaten ? eatenTextures.left : this.leftTextures
      else if (y < 0) this.sprite.textures = this.eaten ? eatenTextures.top : this.topTextures
      else if (y > 0) this.sprite.textures = this.eaten ? eatenTextures.bottom : this.bottomTextures

      this.sprite.gotoAndPlay(0)

      this.direction = rep
    }
  }

  updateMovements = delta => {
    const currNode = this.getCurrentNode()
    const targetNode = this.dead ? this.home : this.getTargetNode()
    if (!targetNode) return

    const nextNode = Pathfinder.findAstarPath(this.game, currNode, targetNode)
    if (!nextNode) return

    const { x, y } = nextNode
    const dir = { x: x - this.x + this.tileWidth / 2, y: y - this.y + this.tileHeight / 2 }

    const aBar = Math.sqrt(dir.x ** 2 + dir.y ** 2)
    dir.x /= aBar
    dir.y /= aBar

    let acc = this.dead ? GHOST_DEAD_ACC : GHOST_ACCELERATION
    Matter.Body.setVelocity(this.rigidBody, {
      x: dir.x * delta * acc,
      y: dir.y * delta * acc
    })

    this.checkSpriteChange(dir)
  }

  update = delta => {
    this.updateMovements(delta)

    const { x, y } = this.rigidBody.position

    this.sprite.x = x
    this.sprite.y = y

    this.x = x
    this.y = y
  }

  setDead = () => {
    this.sprite.textures = this.game.ghostsManager.deadGhostTextures
    this.sprite.gotoAndPlay(0)

    this.dead = true
  }

  setHalfDead = () => {
    if (this.eaten) return

    this.sprite.textures = this.game.ghostsManager.halfDeadGhostTextures
    this.sprite.gotoAndPlay(0)
  }

  setEaten = () => {
    this.eaten = true

    this.sprite.stop()
  }

  setAlive = () => {
    this.dead = false
    this.eaten = false

    this.sprite.play()
    this.checkSpriteChange()
  }

  setInvisible = () => {
    this.sprite.visible = false
  }

  /* -------------------------------------------------------------------------- */
  /*                                   GETTERS                                  */
  /* -------------------------------------------------------------------------- */
  getCurrentNode = () => this.game.world.getNodeFromXY(this.x, this.y)

  getTargetNode = () => {
    console.warn('MISSING IMPLEMENTATION')
  }

  getDirRep = dir => `${dir.x}::${dir.y}`
}
