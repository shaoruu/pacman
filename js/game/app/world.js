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
    this.foodNodes = []

    for (let i = 0; i < MAZE_HEIGHT; i++) {
      for (let j = 0; j < MAZE_WIDTH; j++) {
        const value = parseInt(MAZE_DATA.charAt(i * (MAZE_WIDTH + 1) + j))
        const newNode = new Node(value, i, j, this.game)

        if (newNode.isSpawner) this.spawnerNodes.push(newNode)
        else if (newNode.isFood) {
          this.foodNodes.push(newNode)
          this.groundNodes.push(newNode)
        }

        if (newNode.rigidBody) Matter.World.add(this.game.physicsEngine.world, newNode.rigidBody)

        this.maze[i][j] = newNode
      }
    }

    this.draw()
  }

  draw = () => {
    for (let i = 0; i < MAZE_HEIGHT; i++) {
      for (let j = 0; j < MAZE_WIDTH; j++) {
        this.maze[i][j].draw()
      }
    }
  }

  update = delta => {}

  /* -------------------------------------------------------------------------- */
  /*                                   GETTERS                                  */
  /* -------------------------------------------------------------------------- */
  getIsWalkable = (x, y) => {
    return this.getNodeFromXY(x, y).walkable
  }

  getRandomGroundNode = () => {
    return this.groundNodes[Math.floor(Math.random() * this.groundNodes.length)]
  }

  getNeighborNodes = node => {
    const neighbors = []

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue

        let checkR = node.r + i
        let checkC = node.c + j

        if (rcWithinBounds(checkR, checkC)) {
          neighbors.push(this.getNodeFromRC(checkR, checkC))
        }
      }
    }

    return neighbors
  }

  getNodeFromRC = (r, c) => {
    try {
      return this.maze[r][c]
    } catch (e) {
      return null
    }
  }

  getNodeFromXY = (x, y) => {
    const mappedR = Math.floor(y / this.tileHeight)
    const mappedC = Math.floor(x / this.tileWidth)

    return this.getNodeFromRC(mappedR, mappedC)
  }
}
