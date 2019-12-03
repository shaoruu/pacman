PIXI.loader.add('../assets/Pacman.json').load(chase)

const wrapper = document.getElementById('chasing-animation')

function chase() {
  const ANIMATION_SPEED = 0.2

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

  pacmanSprite.x = (wrapper.offsetWidth * 8.2) / 10
  pacmanSprite.y = wrapper.offsetHeight * 0.73

  pacmanSprite.animationSpeed = ANIMATION_SPEED
  pacmanSprite.play()

  pixiApp.stage.addChild(pacmanSprite)

  const blinkyTextures = []
  for (let i = 6; i <= 8; i++) {
    const texture = spritesheet.textures[`Pacman${i}.png`]
    blinkyTextures.push(texture)
  }

  const clydeTextures = []
  for (let i = 18; i <= 20; i++) {
    const texture = spritesheet.textures[`Pacman${i}.png`]
    clydeTextures.push(texture)
  }

  const inkyTextures = []
  for (let i = 30; i <= 32; i++) {
    const texture = spritesheet.textures[`Pacman${i}.png`]
    inkyTextures.push(texture)
  }

  const pinkyTextures = []
  for (let i = 42; i <= 44; i++) {
    const texture = spritesheet.textures[`Pacman${i}.png`]
    pinkyTextures.push(texture)
  }

  for (let i = 0; i < 4; i++) {
    const ghostTexture =
      i === 3 ? clydeTextures : i === 2 ? inkyTextures : i === 1 ? pinkyTextures : blinkyTextures

    const ghostSprite = new PIXI.AnimatedSprite(ghostTexture)
    ghostSprite.anchor.set(0.5, 0.5)
    ghostSprite.pivot.set(0.5, 0.5)

    ghostSprite.width = wrapper.offsetHeight
    ghostSprite.height = wrapper.offsetHeight

    ghostSprite.x = (wrapper.offsetWidth * (i * 1.5 + 1.8)) / 10
    ghostSprite.y = wrapper.offsetHeight * 0.7

    ghostSprite.animationSpeed = ANIMATION_SPEED
    ghostSprite.play()

    pixiApp.stage.addChild(ghostSprite)
  }

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

const highScoreDOM = document.getElementById('high-score')
highScoreDOM.innerHTML = localStorage.getItem('high-score') || 0

const scoreDOM = document.getElementById('score')
scoreDOM.innerHTML = localStorage.getItem('last-score') || 0
