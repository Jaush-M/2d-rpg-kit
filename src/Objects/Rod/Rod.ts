import { events } from '@/Classes/Events'
import { GameObject } from '@/Classes/GameObject'
import { resources } from '@/Classes/Resource'
import { Sprite } from '@/Classes/Sprite'
import { Vector2 } from '@/Classes/Vector2'

export class Rod extends GameObject {
  constructor(position = new Vector2(0, 0), offset = new Vector2(0, -5)) {
    super({
      position,
      offset,
    })

    this.body = new Sprite({
      resource: resources.images.rod,
    })
    this.addChild(this.body)
  }

  ready() {
    events.on('PLAYER_POSITION', this, (playerPos: Vector2) => {
      // Detect player rod collision
      const roundedPlayerPosX = Math.round(playerPos.x)
      const roundedPlayerPosY = Math.round(playerPos.y)

      if (roundedPlayerPosX === this.position.x && roundedPlayerPosY === this.position.y) {
        this.onCollideWithPlayer()
      }
    })
  }

  onCollideWithPlayer() {
    // Remove instance from scene
    this.destroy()

    events.emit('PLAYER_PICKUP_ITEM', {
      image: resources.images.rod,
      position: this.position,
    })
  }
}
