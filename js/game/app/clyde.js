class Clyde extends Ghost {
  constructor(game, textures, x, y) {
    super(game, textures, x, y)
  }

  update = delta => {
    const { x, y } = this.rigidBody.position

    this.sprite.x = x
    this.sprite.y = y

    this.x = x
    this.y = y
  }
}
