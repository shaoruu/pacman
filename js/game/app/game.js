class Game {
  constructor(spritesheet, slide) {
    this.pixiApp = new PIXI.Application({
      autoResize: true,
      transparent: true,
      resolution: devicePixelRatio,
      backgroundColor: BACKGROUND_COLOR
    })

    this.physicsEngine = Matter.Engine.create()

    this.world = new World(this)
    this.player = new Player(this, spritesheet)

    this.notificationManager = new NotificationManager(this)
    this.ghostsManager = new GhostsManager(this, spritesheet)
    this.collisionsManager = new CollisionsManager(this)

    this.paused = true

    this.initApp(slide)
  }

  initApp = slide => {
    const { width, height } = getTileDimensions()
    this.tileWidth = width
    this.tileHeight = height

    gameDOM.appendChild(this.pixiApp.view)

    this.getStage().addChild(slide.container)

    window.addEventListener('resize', this.resize)
    this.resize()

    this.pixiApp.ticker.add(this.update)
    this.getStage().sortableChildren = true

    this.physicsEngine.world.gravity.y = 0
    Matter.Engine.run(this.physicsEngine)

    this.showReady()
    this.ghostsManager.reset()

    this.introSFX = new Howl({
      src: ['../assets/SFX/pacman_beginning.wav'],
      onend: () => {
        this.start()
      }
    })
    this.introSFX.play()
  }

  resize = () => {
    this.pixiApp.renderer.resize(gameDOM.clientWidth, gameDOM.clientHeight)
  }

  update = delta => {
    if (this.paused) return

    this.world.update(delta)
    this.player.update(delta)
    this.ghostsManager.update(delta)
  }

  pause = () => {
    this.paused = true

    this.player.pause()
    this.ghostsManager.pause()
  }

  resume = () => {
    this.paused = false

    this.player.resume()
    this.ghostsManager.resume()
  }

  start = () => {
    this.paused = false

    this.player.resume()
  }

  showReady = () => {
    this.notificationManager
      .addNotificationAt(
        'READY!',
        GAME_NOTIF_X * this.tileWidth,
        GAME_NOTIF_Y * this.tileHeight,
        GAME_NOTIF_LIFETIME
      )
      .time()
  }

  handlePlayerDeath = () => {
    if (getLivesLeft() === 0) {
      this.gameover()
      return
    }

    reduceALife()
    this.player.revive()
    this.ghostsManager.reset()

    this.showReady()
    setTimeout(() => {
      this.resume()
    }, START_GAME_PAUSE)
  }

  gameover = () => {}

  /* -------------------------------------------------------------------------- */
  /*                                   SETTERS                                  */
  /* -------------------------------------------------------------------------- */
  setBackground = color => (this.pixiApp.renderer.backgroundColor = color)

  /* -------------------------------------------------------------------------- */
  /*                                   GETTERS                                  */
  /* -------------------------------------------------------------------------- */
  getStage = () => this.pixiApp.stage

  getRenderer = () => this.pixiApp.renderer
}
