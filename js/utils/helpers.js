function getTileDimensions() {
  return {
    width: gameDOM.clientWidth / MAZE_WIDTH,
    height: gameDOM.clientHeight / MAZE_HEIGHT
  }
}

function graphicsToTexture(gr, renderer) {
  return renderer.generateTexture(gr)
}

function setHighScore(score) {
  highScoreDOM.innerHTML = score
}

function setScore(score) {
  scoreDOM.innerHTML = score
}
function equalNodes(node1, node2) {
  return node1.r === node2.r && node1.c === node2.c
}

function retracePath(startNode, endNode) {
  const path = []
  let currNode = endNode

  while (!equalNodes(startNode, currNode)) {
    path.unshift(currNode)
    currNode = currNode.parent
  }

  return path
}

function getNodalDistance(node1, node2) {
  // let distR = Math.abs(node1.r - node2.r)
  // let distC = Math.abs(node1.c - node2.c)

  // if (distR > distC) return Math.round(14 * distC + 10 * (distR - distC))
  // return Math.round(14 * distR + 10 * (distC - distR))
  return Math.abs(node1.r - node2.r) + Math.abs(node1.c - node2.c)
}

function isDiagonallyTrapped(world, node, neighbor) {
  const dR = neighbor.r - node.r
  const dC = neighbor.c - node.c

  if (dR !== 0 && dC !== 0) {
    const node1 = world.getNodeFromRC(node.r + dR, node.c)
    const node2 = world.getNodeFromRC(node.r, node.c + dC)

    if (!node1.walkable && !node2.walkable) return true
  }

  return false
}

function rcWithinBounds(checkR, checkC) {
  return checkR >= 0 && checkR < MAZE_HEIGHT && checkC >= 0 && checkC < MAZE_WIDTH
}

function background(bgSize, inputSprite, type, forceSize) {
  var sprite = inputSprite
  var bgContainer = new PIXI.Container()
  var mask = new PIXI.Graphics()
    .beginFill(0x8bc5ff)
    .drawRect(0, 0, bgSize.x, bgSize.y)
    .endFill()
  bgContainer.mask = mask
  bgContainer.addChild(mask)
  bgContainer.addChild(sprite)

  function resize() {
    var sp = { x: sprite.width, y: sprite.height }
    if (forceSize) sp = forceSize
    var winratio = bgSize.x / bgSize.y
    var spratio = sp.x / sp.y
    var scale = 1
    var pos = new PIXI.Point(0, 0)
    if (type == 'cover' ? winratio > spratio : winratio < spratio) {
      //photo is wider than background
      scale = bgSize.x / sp.x
      pos.y = -(sp.y * scale - bgSize.y) / 2
    } else {
      //photo is taller than background
      scale = bgSize.y / sp.y
      pos.x = -(sp.x * scale - bgSize.x) / 2
    }

    sprite.scale = new PIXI.Point(scale, scale)
    sprite.position = pos
  }

  resize()

  return {
    container: bgContainer,
    doResize: resize
  }
}

function tweenRotation(sprite, rotation, time) {
  return createjs.Tween.get(sprite).to({ rotation }, time)
}

function reduceALife() {
  return
  livesDOM.removeChild(livesDOM.firstElementChild)
}

function getLivesLeft() {
  return 100000
  return livesDOM.childElementCount
}

function showLevelUp() {
  levelUpDOM.style.top = '50%'
}

function hideLevelUp() {
  levelUpDOM.style.top = '150%'
  setTimeout(() => {
    levelUpDOM.style.transition = 'none'
    levelUpDOM.style.top = '-50%'
    setTimeout(() => {
      levelUpDOM.style.transition = 'all 0.1s ease'
    }, 50)
  }, 150)
}
