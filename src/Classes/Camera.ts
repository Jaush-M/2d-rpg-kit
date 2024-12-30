import { events } from '@/Classes/Events'
import { GameObject } from '@/Classes/GameObject'
import { Vector2 } from '@/Classes/Vector2'
import { canvas } from '@/main'
import { Level } from '@/Objects/Level/Level'

export class Camera extends GameObject {
  constructor() {
    super()

    events.on('PLAYER_POSITION', this, (playerPos: Vector2) => {
      this.centerPositionOnTarget(playerPos)
    })

    events.on('CHANGE_LEVEL', this, (level: Level) => {
      this.centerPositionOnTarget(level.playerPosition)
    })
  }

  centerPositionOnTarget(pos: Vector2) {
    // Create camera position based on position
    const playerHalf = 8
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const halfWidth = -playerHalf + canvasWidth / 2
    const halfHeight = -playerHalf + canvasHeight / 2

    this.position = new Vector2(-pos.x + halfWidth, -pos.y + halfHeight)
  }
}
