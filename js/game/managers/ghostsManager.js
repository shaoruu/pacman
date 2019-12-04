class GhostsManager {
  constructor(game, spritesheet) {
    this.game = game

    this.initSprites(spritesheet.spritesheet)
    this.initGhosts()
    this.initSFX()
  }

  initSprites = spritesheet => {
    const blinkyTextures = {
      left: [],
      right: [],
      top: [],
      bottom: []
    }
    const pinkyTextures = {
      left: [],
      right: [],
      top: [],
      bottom: []
    }
    const inkyTextures = {
      left: [],
      right: [],
      top: [],
      bottom: []
    }
    const clydeTextures = {
      left: [],
      right: [],
      top: [],
      bottom: []
    }

    const deadGhostTextures = []
    const halfDeadGhostTextures = []
    const eatenGhostTextures = {
      left: [],
      right: [],
      top: [],
      bottom: []
    }

    for (let i = 0; i < 12; i++) {
      const texture = spritesheet.textures[`Pacman${i}.png`]
      switch (Math.floor(i / 3)) {
        case 0:
          blinkyTextures.left.push(texture)
          break
        case 1:
          blinkyTextures.bottom.push(texture)
          break
        case 2:
          blinkyTextures.right.push(texture)
          break
        case 3:
          blinkyTextures.top.push(texture)
          break
      }
    }

    for (let i = 12; i < 24; i++) {
      const texture = spritesheet.textures[`Pacman${i}.png`]
      switch (Math.floor(i / 3)) {
        case 4:
          clydeTextures.left.push(texture)
          break
        case 5:
          clydeTextures.bottom.push(texture)
          break
        case 6:
          clydeTextures.right.push(texture)
          break
        case 7:
          clydeTextures.top.push(texture)
          break
      }
    }

    for (let i = 24; i < 36; i++) {
      const texture = spritesheet.textures[`Pacman${i}.png`]
      switch (Math.floor(i / 3)) {
        case 8:
          inkyTextures.left.push(texture)
          break
        case 9:
          inkyTextures.bottom.push(texture)
          break
        case 10:
          inkyTextures.right.push(texture)
          break
        case 11:
          inkyTextures.top.push(texture)
          break
      }
    }

    for (let i = 36; i < 48; i++) {
      const texture = spritesheet.textures[`Pacman${i}.png`]
      switch (Math.floor(i / 3)) {
        case 12:
          pinkyTextures.left.push(texture)
          break
        case 13:
          pinkyTextures.bottom.push(texture)
          break
        case 14:
          pinkyTextures.right.push(texture)
          break
        case 15:
          pinkyTextures.top.push(texture)
          break
      }
    }

    for (let i = 48; i < 51; i++) {
      const texture = spritesheet.textures[`Pacman${i}.png`]
      deadGhostTextures.push(texture)
    }

    for (let i = 48; i < 54; i++) {
      const texture = spritesheet.textures[`Pacman${i}.png`]
      halfDeadGhostTextures.push(texture)
    }

    for (let i = 70; i < 74; i++) {
      const texture = spritesheet.textures[`Pacman${i}.png`]
      switch (Math.floor(i % 4)) {
        case 2:
          eatenGhostTextures.left.push(texture)
          break
        case 3:
          eatenGhostTextures.bottom.push(texture)
          break
        case 0:
          eatenGhostTextures.right.push(texture)
          break
        case 1:
          eatenGhostTextures.top.push(texture)
          break
      }
    }

    this.blinkyTextures = blinkyTextures
    this.pinkyTextures = pinkyTextures
    this.inkyTextures = inkyTextures
    this.clydeTextures = clydeTextures

    this.deadGhostTextures = deadGhostTextures
    this.halfDeadGhostTextures = halfDeadGhostTextures
    this.eatenGhostTextures = eatenGhostTextures
  }

  initGhosts = () => {
    const { width, height } = getTileDimensions()

    this.blinky = new Blinky(
      this.game,
      this.blinkyTextures,
      BLINKY_INIT_X * width,
      BLINKY_INIT_Y * height
    )
    this.pinky = new Pinky(
      this.game,
      this.pinkyTextures,
      PINKY_INIT_X * width,
      PINKY_INIT_Y * height
    )
    this.inky = new Inky(
      this.game,
      this.inkyTextures,
      INKY_INIT_X * width,
      INKY_INIT_Y * height
    )
    this.clyde = new Clyde(
      this.game,
      this.clydeTextures,
      CLYDE_INIT_X * width,
      CLYDE_INIT_Y * height
    )

    this.tileWidth = width
    this.tileHeight = height
  }

  initSFX = () => {
    this.turnToBlueSFX = new Howl({
      src: ['../assets/SFX/ghost-turn-to-blue.mp3'],
      loop: true
    })

    this.spurtSFX1 = new Howl({
      src: ['../assets/SFX/ghost-spurt-move-1.mp3'],
      loop: true
    })

    this.spurtSFX2 = new Howl({
      src: ['../assets/SFX/ghost-spurt-move-2.mp3'],
      loop: true
    })

    this.spurtSFX3 = new Howl({
      src: ['../assets/SFX/ghost-spurt-move-3.mp3'],
      loop: true
    })

    this.spurtSFX4 = new Howl({
      src: ['../assets/SFX/ghost-spurt-move-4.mp3'],
      loop: true
    })

    this.currSpurtSFX = this.spurtSFX1
  }

  update = delta => {
    this.blinky.update(delta)
    this.pinky.update(delta)
    this.inky.update(delta)
    this.clyde.update(delta)
  }

  reset = () => {
    const width = this.tileWidth
    const height = this.tileHeight

    this.blinky.setPosition(BLINKY_INIT_X * width, BLINKY_INIT_Y * height)
    this.pinky.setPosition(PINKY_INIT_X * width, PINKY_INIT_Y * height)
    this.inky.setPosition(INKY_INIT_X * width, INKY_INIT_Y * height)
    this.clyde.setPosition(CLYDE_INIT_X * width, CLYDE_INIT_Y * height)

    this.showAllGhosts()
  }

  pause = () => {
    this.blinky.pause()
    this.pinky.pause()
    this.inky.pause()
    this.clyde.pause()

    this.currSpurtSFX.pause()
    this.spurtIsPlaying = false
  }

  resume = () => {
    console.log('ok')
    this.blinky.resume()
    this.pinky.resume()
    this.inky.resume()
    this.clyde.resume()

    if (!this.spurtIsPlaying) {
      this.currSpurtSFX.play()
      this.spurtIsPlaying = true
    }
  }

  setAllDead = () => {
    clearTimeout(this.deadTimeout, this.halfDeadTimeout)

    this.allDead = true
    this.turnToBlueSFX.play()

    this.blinky.setDead()
    this.pinky.setDead()
    this.inky.setDead()
    this.clyde.setDead()

    this.deadTimeout = setTimeout(() => {
      this.blinky.setHalfDead()
      this.pinky.setHalfDead()
      this.inky.setHalfDead()
      this.clyde.setHalfDead()

      this.halfDeadTimeout = setTimeout(() => {
        this.blinky.setAlive()
        this.pinky.setAlive()
        this.inky.setAlive()
        this.clyde.setAlive()

        this.allDead = false
        this.turnToBlueSFX.stop()

        clearTimeout(this.deadTimeout, this.halfDeadTimeout)
      }, GHOST_HALF_DEAD_PERIOD)
    }, GHOST_DEAD_PERIOD)
  }

  advanceToSpurtTwo = () => {
    this.currSpurtSFX.pause()
    this.spurtSFX2.play()

    this.currSpurtSFX = this.spurtSFX2
  }

  advanceToSpurtThree = () => {
    this.currSpurtSFX.pause()
    this.spurtSFX3.play()

    this.currSpurtSFX = this.spurtSFX3
  }

  advanceToSpurtFour = () => {
    this.currSpurtSFX.pause()
    this.spurtSFX4.play()

    this.currSpurtSFX = this.spurtSFX4
  }

  resetSpurtSFX = () => {
    this.currSpurtSFX.pause()
    this.currSpurtSFX = this.spurtSFX1

    this.spurtIsPlaying = true
    this.currSpurtSFX.play()
  }

  hideAllGhosts = () => {
    this.blinky.setVisibility(false)
    this.pinky.setVisibility(false)
    this.inky.setVisibility(false)
    this.clyde.setVisibility(false)
  }

  showAllGhosts = () => {
    this.blinky.setVisibility(true)
    this.pinky.setVisibility(true)
    this.inky.setVisibility(true)
    this.clyde.setVisibility(true)
  }
}
