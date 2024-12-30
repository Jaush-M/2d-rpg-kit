import { GameObject } from '@/Classes/GameObject'
import { ImageProps } from '@/Classes/Resource'
import { Sprite } from '@/Classes/Sprite'
import { Vector2 } from '@/Classes/Vector2'
import { canvas } from '@/main'

export class Ground extends GameObject {
  constructor(resource: ImageProps) {
    super()

    this.drawLayer = 'BASE'
    this.addChild(
      new Sprite({
        resource,
        frameSize: new Vector2(canvas.width, canvas.height),
      })
    )
  }
}
