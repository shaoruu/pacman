class Game {
  constructor(spritesheet) {
    this.pixiApp = new PIXI.Application({
      autoResize: true,
      transparent: true,
      resolution: devicePixelRatio,
      backgroundColor: BACKGROUND_COLOR
    })

    this.physicsEngine = Matter.Engine.create()

    this.world = new World(this)
    this.player = new Player(this, spritesheet)

    this.notificationManager = new NotificationManager()
    this.ghostsManager = new GhostsManager()

    this.started = false

    this.initApp()
  }

  initApp = () => {
    gameDOM.appendChild(this.pixiApp.view)

    window.addEventListener('resize', this.resize)
    this.resize()

    this.pixiApp.ticker.add(this.update)
    this.getStage().sortableChildren = true

    this.physicsEngine.world.gravity.y = 0
    Matter.Engine.run(this.physicsEngine)

    Matter.Events.on(this.physicsEngine, 'collisionStart', function(event) {})

    Matter.Events.on(this.physicsEngine, 'collisionActive', function(event) {})

    const introSFX = new Howl({
      src: ['../assets/SFX/pacman_beginning.wav'],
      onend: this.start
    })
    introSFX.play()
  }

  resize = () => {
    this.pixiApp.renderer.resize(gameDOM.clientWidth, gameDOM.clientHeight)
  }

  update = delta => {
    if (!this.started) return

    this.world.update(delta)
    this.player.update(delta)
    this.ghostsManager.update(delta)
    this.notificationManager.update()
  }

  start = () => {
    this.start = true
  }

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
