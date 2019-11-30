class GhostsManager {
  constructor(game, spritesheet) {
    this.game = game

    this.initSprites(spritesheet.spritesheet)
    this.initGhosts()
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

    this.blinkyTextures = blinkyTextures
    this.pinkyTextures = pinkyTextures
    this.inkyTextures = inkyTextures
    this.clydeTextures = clydeTextures
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
    this.inky = new Inky(this.game, this.inkyTextures, INKY_INIT_X * width, INKY_INIT_Y * height)
    this.clyde = new Clyde(
      this.game,
      this.clydeTextures,
      CLYDE_INIT_X * width,
      CLYDE_INIT_Y * height
    )
  }

  update = delta => {
    this.blinky.update(delta)
    this.pinky.update(delta)
    this.inky.update(delta)
    this.clyde.update(delta)
  }
}
