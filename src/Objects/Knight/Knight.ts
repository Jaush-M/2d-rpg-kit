import { resources } from '@/Classes/Resource'
import { Sprite } from '@/Classes/Sprite'
import { StoryFlagScenarios } from '@/Classes/StoryFlags'
import { Vector2 } from '@/Classes/Vector2'
import { Npc } from '@/Objects/Npc/Npc'

interface KnightProps {
  position: Vector2
  content: StoryFlagScenarios
  body?: Sprite
  portraitFrame?: null | number
}

export class Knight extends Npc {
  constructor({ position, content, portraitFrame = 1 }: KnightProps) {
    super({
      position,
      content,
      portraitFrame,
      body: new Sprite({
        resource: resources.images.knight1,
        frameSize: new Vector2(32, 32),
        hFrames: 2,
        vFrames: 1,
        offset: new Vector2(-8, -20),
      }),
    })

    const shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32, 32),
      offset: new Vector2(-8, -19),
    })

    this.addChild(shadow)
    this.addChild(this.body)
  }
}
