class World {
  constructor(game) {
    this.game = game

    this.initMaze()
  }

  initMaze = () => {
    this.maze = new Array(MAZE_HEIGHT)

    for (let i = 0; i < MAZE_HEIGHT; i++) {
      this.maze[i] = new Array(MAZE_WIDTH)
    }

    this.setupMaze()
  }

  /* -------------------------------------------------------------------------- */
  /*                                    TEST                                    */
  /* -------------------------------------------------------------------------- */
  setupMaze = () => {
    const { width, height } = getTileDimensions()
    this.tileWidth = width
    this.tileHeight = height

    this.spawnerNodes = []
    this.groundNodes = []

    this.graphics = new PIXI.Graphics()

    for (let i = 0; i < MAZE_HEIGHT; i++) {
      for (let j = 0; j < MAZE_WIDTH; j++) {
        const value = parseInt(MAZE_DATA.charAt(i * (MAZE_WIDTH + 1) + j))
        const newNode = new Node(value, i, j)

        if (newNode.isSpawner) this.spawnerNodes.push(newNode)

        if (newNode.rigidBody) Matter.World.add(this.game.physicsEngine.world, newNode.rigidBody)
        else this.groundNodes.push(newNode)

        this.maze[i][j] = newNode
      }
    }

    this.draw()

    this.mapSprite = new PIXI.Sprite(graphicsToTexture(this.graphics, this.game.getRenderer()))
    this.game.getStage().addChild(this.mapSprite)
  }

  draw = () => {
    for (let i = 0; i < MAZE_HEIGHT; i++) {
      for (let j = 0; j < MAZE_WIDTH; j++) {
        this.maze[i][j].draw(this.graphics)
      }
    }
  }

  update = delta => {}

  /* -------------------------------------------------------------------------- */
  /*                                   GETTERS                                  */
  /* -------------------------------------------------------------------------- */
  getIsWalkable = (x, y) => {
    return this.getNodeByXY(x, y).walkable
  }

  getNodeByXY = (x, y) => {
    const mappedR = Math.floor(y / this.tileHeight)
    const mappedC = Math.floor(x / this.tileWidth)

    return this.maze[mappedR][mappedC]
  }
}
