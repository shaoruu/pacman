class Player {
  constructor(game, spritesheet) {
    this.game = game
    this.spritesheet = spritesheet.spritesheet

    this.init()

    this.direction = null
    this.dead = false
  }

  init = () => {
    this.playerWidth = getPlayerWidth()

    this.initTextures()
    this.initSFX()

    const { width, height } = getTileDimensions()
    this.tileWidth = width

    this.tileHeight = height
    this.x = (PLAYER_INIT_X + 0.5) * this.tileWidth
    this.y = (PLAYER_INIT_Y + 0.5) * this.tileHeight

    this.rigidBody = Matter.Bodies.circle(this.x, this.y, this.playerWidth / 2, {
      // slop: 0,
      friction: 1,
      inertia: Infinity
    })
    this.rigidBody.isPlayer = true
    this.rigidBody.parentRef = this

    const { x, y } = this.rigidBody.position

    this.sprite.x = x
    this.sprite.y = y

    this.score = 0

    Matter.World.add(this.game.physicsEngine.world, this.rigidBody)
    this.paused = true

    this.initSFX()
    this.initListeners()
  }

  initTextures = () => {
    this.spriteTextures = []
    for (let i = 65; i <= 66; i++) {
      const texture = this.spritesheet.textures[`Pacman${i}.png`]
      this.spriteTextures.push(texture)
    }

    this.deathTextures = []
    for (let i = 54; i < 65; i++) {
      const texture = this.spritesheet.textures[`Pacman${i}.png`]
      this.deathTextures.push(texture)
    }

    this.sprite = new PIXI.AnimatedSprite(this.spriteTextures)
    this.sprite.anchor.set(0.5, 0.5)
    this.sprite.pivot.set(0.5, 0.5)

    this.sprite.width = this.playerWidth
    this.sprite.height = this.playerWidth

    this.sprite.animationSpeed = 0.2
    this.sprite.play()

    this.game.getStage().addChild(this.sprite)

    this.updateCurrNode()
  }

  initSFX = () => {
    this.eatSFX = new Howl({
      src: ['../../../assets/SFX/eating.mp3'],
      loop: true,
      pool: 1,
      onend: this.deactivateSFX
    })

    this.deathSFX = new Howl({
      src: ['../../../assets/SFX/pacman_death.wav']
    })

    this.eatGhostSFX = new Howl({
      src: ['../../../assets/SFX/pacman_eatghost.wav']
    })
  }

  initListeners = () => {
    const up = keyboard('ArrowUp')
    const down = keyboard('ArrowDown')
    const left = keyboard('ArrowLeft')
    const right = keyboard('ArrowRight')

    up.press = () => {
      if (
        this.dead ||
        !this.game.world.getIsWalkable(this.sprite.x, this.sprite.y - this.tileHeight)
      ) {
        return
      }
      if (this.direction !== UP) {
        this.directionChangedTo(UP)
      }
      this.direction = UP

      tweenRotation(this.sprite, -Math.PI / 2, PLAYER_ROTATION_TWEEN)
    }
    down.press = () => {
      if (
        this.dead ||
        !this.game.world.getIsWalkable(this.sprite.x, this.sprite.y + this.tileHeight)
      ) {
        return
      }
      if (this.direction !== DOWN) {
        this.directionChangedTo(DOWN)
      }
      this.direction = DOWN

      tweenRotation(this.sprite, Math.PI / 2, PLAYER_ROTATION_TWEEN)
    }
    left.press = () => {
      if (
        this.dead ||
        !this.game.world.getIsWalkable(this.sprite.x - this.tileWidth, this.sprite.y)
      ) {
        return
      }
      if (this.direction !== LEFT) {
        this.directionChangedTo(LEFT)
      }
      this.direction = LEFT

      tweenRotation(this.sprite, -Math.PI, PLAYER_ROTATION_TWEEN)
    }
    right.press = () => {
      if (
        this.dead ||
        !this.game.world.getIsWalkable(this.sprite.x + this.tileWidth, this.sprite.y)
      ) {
        return
      }
      if (this.direction !== RIGHT) {
        this.directionChangedTo(RIGHT)
      }
      this.direction = RIGHT

      tweenRotation(this.sprite, 0, PLAYER_ROTATION_TWEEN)
    }
  }

  // returns if in new node
  updateCurrNode = () => {
    const currNode = this.game.world.getNodeFromXY(this.x, this.y)
    const bool = currNode !== this.currNode
    this.currNode = currNode

    return bool
  }

  update = delta => {
    if (this.paused || this.dead) return

    this.updateCurrNode()

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

    this.x = x
    this.y = y
  }

  eat = foodRef => {
    if (this.paused) return

    if (foodRef.hasBeenEaten) {
      this.deactivateSFX()
    } else {
      foodRef.eaten()
      this.game.world.playerAte(foodRef)
      this.addScore(REGULAR_FOOD_POINT)
      this.activateSFX()
    }
  }

  eatGhost = ghostRef => {
    if (ghostRef.eaten) return

    const node = this.game.world.getNodeFromXY(ghostRef.x, ghostRef.y)
    this.game.notificationManager
      .addNotificationAt(
        PLAYER_EAT_GHOST_SCORE,
        node.x + this.tileWidth / 2,
        node.y + this.tileHeight / 2,
        SCORE_NOTIF_LIFETIME
      )
      .time()
    this.addScore(PLAYER_EAT_GHOST_SCORE)

    ghostRef.setEaten()

    this.eatGhostSFX.play()
  }

  setGhostsDead = () => {
    if (!this.game.ghostsManager.allDead) {
      this.game.ghostsManager.setAllDead()
    }
  }

  directionChangedTo = dir => {
    let node
    switch (dir) {
      case UP:
        node = this.game.world.getNodeFromXY(this.x, this.y)
        while (true) {
          const nextNode = this.game.world.getNodeFromRC(node.r - 1, node.c)
          if (nextNode && nextNode.walkable) node = nextNode
          else break
        }
        break
      case DOWN:
        node = this.game.world.getNodeFromXY(this.x, this.y)
        while (true) {
          const nextNode = this.game.world.getNodeFromRC(node.r + 1, node.c)
          if (nextNode && nextNode.walkable) node = nextNode
          else break
        }
        break
      case LEFT:
        node = this.game.world.getNodeFromXY(this.x, this.y)
        while (true) {
          const nextNode = this.game.world.getNodeFromRC(node.r, node.c - 1)
          if (nextNode && nextNode.walkable) node = nextNode
          else break
        }
        break
      case RIGHT:
        node = this.game.world.getNodeFromXY(this.x, this.y)
        while (true) {
          const nextNode = this.game.world.getNodeFromRC(node.r, node.c + 1)
          if (nextNode && nextNode.walkable) node = nextNode
          else break
        }
        break
    }
    this.ambushNode = node
  }

  addScore = score => {
    this.score += score
    setScore(this.score)

    if (this.score >= parseInt(highScoreDOM.innerHTML)) {
      setHighScore(this.score)
      localStorage.setItem('high-score', this.score)
    }
  }

  kill = () => {
    this.dead = true

    this.sprite.stop()
    this.sprite.rotation = 0

    this.game.pause()
    this.deactivateSFX()

    setTimeout(() => {
      this.game.ghostsManager.hideAllGhosts()
      this.sprite.loop = false
      this.sprite.textures = this.deathTextures
      this.sprite.animationSpeed = 0.15
      this.sprite.gotoAndPlay(0)

      this.deathSFX.play()

      setTimeout(this.game.handlePlayerDeath, PLAYER_AFTERLIFE_DELAY)
    }, PLAYER_DEATH_DELAY)
  }

  reset = () => {
    this.dead = false

    this.x = (PLAYER_INIT_X + 0.5) * this.tileWidth
    this.y = (PLAYER_INIT_Y + 0.5) * this.tileHeight

    this.sprite.x = this.x
    this.sprite.y = this.y

    this.sprite.loop = true
    this.sprite.textures = this.spriteTextures
    this.animationSpeed = 0.2
    this.sprite.gotoAndPlay(0)

    Matter.Body.setPosition(this.rigidBody, this)
  }

  pause = () => {
    this.paused = true
  }

  resume = () => {
    this.paused = false
  }

  activateSFX = () => {
    if (this.playEating) return
    this.eatSFX.play()
    this.playEating = true
  }

  deactivateSFX = () => {
    this.eatSFX.pause()
    this.playEating = false
  }
}
