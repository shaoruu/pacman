function getTileDimensions() {
  return {
    width: gameDOM.clientWidth / MAZE_WIDTH,
    height: gameDOM.clientHeight / MAZE_HEIGHT
  }
}

function graphicsToTexture(gr, renderer) {
  return renderer.generateTexture(gr)
}
