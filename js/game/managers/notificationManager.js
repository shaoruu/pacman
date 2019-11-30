class NotificationManager {
  constructor(game) {
    this.game = game

    this.initTextures()
  }

  initTextures = () => {
    this.textStyle = new PIXI.TextStyle({
      fontFamily: 'GAME',
      fontSize: 20,
      fill: NOTIF_COLOR
    })
  }

  addNotificationAt = (str, x, y, lifetime) => {
    const text = new PIXI.Text(str, this.textStyle)
    text.x = x
    text.y = y

    text.pivot.set(0.5, 0.5)
    text.anchor.set(0.5, 0.5)

    this.game.getStage().addChild(text)

    const destroy = () => {
      this.game.getStage().removeChild(text)
    }

    return {
      destroy,
      time: () => {
        const timeoutRep = `${str}${performance.now()}timeout`
        this[timeoutRep] = setTimeout(() => {
          destroy()
          clearTimeout(this[timeoutRep])
        }, lifetime)
      }
    }
  }
}
