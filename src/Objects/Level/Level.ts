import { GameObject } from '@/Classes/GameObject'
import { Sprite } from '@/Classes/Sprite'
import { Vector2 } from '@/Classes/Vector2'

export class Level extends GameObject {
  playerPosition

  background?: Sprite
  collisions?: Set<string>

  constructor({ playerPosition = new Vector2(0, 0) } = {}) {
    super()

    this.playerPosition = playerPosition
  }
}
