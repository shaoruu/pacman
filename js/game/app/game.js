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

    this.notificationManager = new NotificationManager()
    this.ghostsManager = new GhostsManager(this, spritesheet)

    this.paused = true

    this.initApp(slide)
  }

  initApp = slide => {
    gameDOM.appendChild(this.pixiApp.view)

    this.getStage().addChild(slide.container)

    window.addEventListener('resize', this.resize)
    this.resize()

    this.pixiApp.ticker.add(this.update)
    this.getStage().sortableChildren = true

    this.physicsEngine.world.gravity.y = 0
    Matter.Engine.run(this.physicsEngine)

    Matter.Events.on(this.physicsEngine, 'collisionStart', function(event) {
      const { pairs } = event

      for (let i = 0; i < pairs.length; i++) {
        const { bodyA, bodyB } = pairs[i]

        if ((bodyA.isPlayer && bodyB.isFood) || (bodyA.isFood && bodyB.isPlayer)) {
          let foodRef = bodyA.isFood ? bodyA.parentRef : bodyB.parentRef
          let playerRef = bodyA.isPlayer ? bodyA.parentRef : bodyB.parentRef

          playerRef.eat(foodRef)
        }
      }
    })

    Matter.Events.on(this.physicsEngine, 'collisionActive', function(event) {})

    // this.introSFX = new Howl({
    //   src: ['../assets/SFX/pacman_beginning.wav'],
    //   onend: () => {
    //     this.resume()
    //     this.backgroundMusic.play()
    //   }
    // })
    // this.introSFX.play()

    // this.backgroundMusic = new Howl({
    //   src: ['../assets/SFX/pac-man-theme-remix-by-arsenic1987.mp3'],
    //   volume: 0.6,
    //   loop: true
    // })
    this.resume()
  }

  resize = () => {
    this.pixiApp.renderer.resize(gameDOM.clientWidth, gameDOM.clientHeight)
  }

  update = delta => {
    if (this.paused) return

    this.world.update(delta)
    this.player.update(delta)
    this.ghostsManager.update(delta)
    this.notificationManager.update()
  }

  pause = () => {
    this.paused = true

    this.player.pause()
  }

  resume = () => {
    this.paused = false

    this.player.resume()
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
