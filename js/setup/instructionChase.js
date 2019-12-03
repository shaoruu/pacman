PIXI.loader.add('../assets/Pacman.json').load(chase)

const wrapper = document.getElementById('chasing-animation')

function chase() {
  const ANIMATION_SPEED = 0.2
  const FOOD_RADIUS = 10

  const { spritesheet } = PIXI.loader.resources['../assets/Pacman.json']

  const pixiApp = new PIXI.Application({
    autoResize: true,
    transparent: true
  })

  wrapper.appendChild(pixiApp.view)

  const pacmanTextures = []
  for (let i = 65; i <= 66; i++) {
    const texture = spritesheet.textures[`Pacman${i}.png`]
    pacmanTextures.push(texture)
  }

  const pacmanSprite = new PIXI.AnimatedSprite(pacmanTextures)
  pacmanSprite.anchor.set(0.5, 0.5)
  pacmanSprite.pivot.set(0.5, 0.5)

  pacmanSprite.width = wrapper.offsetHeight / 2.2
  pacmanSprite.height = wrapper.offsetHeight / 2.2

  pacmanSprite.x = (wrapper.offsetWidth * 3) / 10
  pacmanSprite.y = wrapper.offsetHeight * 0.5
  pacmanSprite.scale.x = -pacmanSprite.scale.x

  pacmanSprite.animationSpeed = ANIMATION_SPEED
  pacmanSprite.play()

  pixiApp.stage.addChild(pacmanSprite)

  const blinkyTextures = []
  for (let i = 0; i <= 2; i++) {
    const texture = spritesheet.textures[`Pacman${i}.png`]
    blinkyTextures.push(texture)
  }

  const clydeTextures = []
  for (let i = 12; i <= 14; i++) {
    const texture = spritesheet.textures[`Pacman${i}.png`]
    clydeTextures.push(texture)
  }

  const inkyTextures = []
  for (let i = 24; i <= 26; i++) {
    const texture = spritesheet.textures[`Pacman${i}.png`]
    inkyTextures.push(texture)
  }

  const pinkyTextures = []
  for (let i = 36; i <= 38; i++) {
    const texture = spritesheet.textures[`Pacman${i}.png`]
    pinkyTextures.push(texture)
  }

  for (let i = 0; i < 4; i++) {
    const ghostTexture =
      i === 3
        ? clydeTextures
        : i === 2
        ? inkyTextures
        : i === 1
        ? pinkyTextures
        : blinkyTextures

    const ghostSprite = new PIXI.AnimatedSprite(ghostTexture)
    ghostSprite.anchor.set(0.5, 0.5)
    ghostSprite.pivot.set(0.5, 0.5)

    ghostSprite.width = wrapper.offsetHeight
    ghostSprite.height = wrapper.offsetHeight

    ghostSprite.x = (wrapper.offsetWidth * (i * 1.1 + 5)) / 10
    ghostSprite.y = wrapper.offsetHeight * 0.5

    ghostSprite.animationSpeed = ANIMATION_SPEED
    ghostSprite.play()

    pixiApp.stage.addChild(ghostSprite)
  }

  const foodGraphics = new PIXI.Graphics()
  foodGraphics.beginFill(0xffa259, 1)
  foodGraphics.lineStyle(2, 0xffa259, 1)
  foodGraphics.drawCircle(0, 0, FOOD_RADIUS)

  const foodSprite = new PIXI.Sprite(pixiApp.renderer.generateTexture(foodGraphics))
  foodSprite.anchor.set(0.5, 0.5)
  foodSprite.pivot.set(0.5, 0.5)
  foodSprite.x = (wrapper.offsetWidth * 2) / 10
  foodSprite.y = wrapper.offsetHeight / 2

  pixiApp.stage.addChild(foodSprite)

  const resize = () => {
    pixiApp.renderer.resize(wrapper.clientWidth, wrapper.clientHeight)
  }

  window.addEventListener('resize', resize)
  resize()
}

const menuButton = document.getElementById('menu')

const goMenu = () => {
  window.location.href = '../index.html'
}

menuButton.addEventListener('click', goMenu, false)

keyboard('Enter').press = goMenu
