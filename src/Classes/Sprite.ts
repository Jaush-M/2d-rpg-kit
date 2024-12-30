import { Animations } from '@/Classes/Animations'
import type { ImageProps } from './Resource'
import { Vector2 } from './Vector2'
import { FrameIndexPattern } from '@/Classes/FrameIndexPattern'
import { GameObject } from '@/Classes/GameObject'
import { ctx } from '@/main'

interface SpriteOptions<T extends Record<string, FrameIndexPattern>> {
  resource: ImageProps // The image resource to display
  frameSize?: Vector2 // The width and height of the cropped frame
  hFrames?: number // Horizontal frame count, default is 1
  vFrames?: number // Vertical frame count, default is 1
  frame?: number // Current frame coordinates
  scale?: number // Scaling factor, default is 1
  position?: Vector2 // Position to draw the sprite
  offset?: Vector2 // Position to draw the sprite
  animations?: Animations<T>
}

export class Sprite<T extends Record<string, FrameIndexPattern> = any> extends GameObject {
  resource: ImageProps
  frameSize: Vector2
  hFrames: number
  vFrames: number
  frame: number
  frameMap: Map<number, Vector2>
  scale: number
  position: Vector2
  animations?: Animations<T>

  constructor({
    resource,
    frameSize = new Vector2(16, 16),
    hFrames = 1,
    vFrames = 1,
    frame = 0,
    scale = 1,
    position = new Vector2(0, 0),
    offset = new Vector2(0, 0),
    animations,
  }: SpriteOptions<T>) {
    super({
      position,
      offset,
    })

    this.resource = resource
    this.frameSize = frameSize
    this.hFrames = hFrames
    this.vFrames = vFrames
    this.frame = frame
    this.frameMap = new Map()
    this.scale = scale
    this.position = position
    this.animations = animations
    this.buildFrameMap()
  }

  step(delta: number) {
    if (!this.animations) return

    this.animations.step(delta)
    this.frame = this.animations.frame
  }

  buildFrameMap() {
    let frameCount = 0
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(frameCount, new Vector2(h * this.frameSize.x, v * this.frameSize.y))

        frameCount++
      }
    }
  }

  drawImage(x = 0, y = 0) {
    if (!this.resource.isLoaded) return

    const frame = this.frameMap.get(this.frame) ?? { x: 0, y: 0 }

    ctx.drawImage(
      this.resource.image,
      frame.x,
      frame.y,
      this.frameSize.x,
      this.frameSize.y,
      x,
      y,
      this.frameSize.x * this.scale,
      this.frameSize.y * this.scale
    )
  }
}
