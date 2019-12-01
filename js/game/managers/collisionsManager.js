class CollisionsManager {
  constructor(game) {
    this.game = game

    this.setup()
  }

  setup = () => {
    Matter.Events.on(this.game.physicsEngine, 'collisionStart', event => {
      const { pairs } = event

      for (let i = 0; i < pairs.length; i++) {
        const { bodyA, bodyB } = pairs[i]

        if ((bodyA.isPlayer && bodyB.isFood) || (bodyA.isFood && bodyB.isPlayer)) {
          let foodRef = bodyA.isFood ? bodyA.parentRef : bodyB.parentRef
          let playerRef = bodyA.isPlayer ? bodyA.parentRef : bodyB.parentRef

          playerRef.eat(foodRef)
        } else if (bodyA.isGhost && bodyB.isGhost) {
          pairs[i].isActive = false
        } else if ((bodyA.isPlayer && bodyB.isKiller) || (bodyA.isKiller && bodyB.isPlayer)) {
          let killerRef = bodyA.isKiller ? bodyA.parentRef : bodyB.parentRef
          let playerRef = bodyA.isPlayer ? bodyA.parentRef : bodyB.parentRef

          this.game.world.playerAte(killerRef)
          killerRef.eaten()
          playerRef.setGhostsDead()
        } else if ((bodyA.isPlayer && bodyB.isGhost) || (bodyA.isGhost && bodyB.isPlayer)) {
          let ghostRef = bodyA.isGhost ? bodyA.parentRef : bodyB.parentRef
          let playerRef = bodyA.isPlayer ? bodyA.parentRef : bodyB.parentRef

          if (ghostRef.dead) {
            playerRef.eatGhost(ghostRef)
          } else if (!playerRef.dead) {
            playerRef.kill()
          }

          pairs[i].isActive = false
        }
      }
    })

    Matter.Events.on(this.game.physicsEngine, 'collisionActive', function(event) {})
  }
}
