import { events } from '@/Classes/Events'
import { GameObject } from '@/Classes/GameObject'
import { resources } from '@/Classes/Resource'
import { Sprite } from '@/Classes/Sprite'
import { Vector2 } from '@/Classes/Vector2'

export class Exit extends GameObject {
  constructor(position: Vector2) {
    super({
      position,
    })

    this.drawLayer = 'FLOOR'
    this.addChild(new Sprite({ resource: resources.images.exit }))
  }

  ready() {
    // Detect player collision
    events.on('PLAYER_POSITION', this, (playerPos: Vector2) => {
      const roundedPlayerPosX = Math.round(playerPos.x)
      const roundedPlayerPosY = Math.round(playerPos.y)

      if (roundedPlayerPosX === this.position.x && roundedPlayerPosY === this.position.y) {
        events.emit('PLAYER_EXITS')
      }
    })
  }
}
