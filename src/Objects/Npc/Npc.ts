import { GameObject } from '@/Classes/GameObject'
import { resources } from '@/Classes/Resource'
import { Sprite } from '@/Classes/Sprite'
import { storyFlags, StoryFlagScenarios } from '@/Classes/StoryFlags'
import { Vector2 } from '@/Classes/Vector2'

interface NpcProps {
  position: Vector2
  content: StoryFlagScenarios
  body: Sprite
  portraitFrame?: null | number
}

export class Npc extends GameObject {
  body
  portraitFrame
  content

  constructor({ position, content, body, portraitFrame }: NpcProps) {
    super({
      position,
    })

    this.isSolid = true

    this.body = body
    this.portraitFrame = portraitFrame

    this.content = content
  }

  getContent() {
    const match = storyFlags.getRelevantScenario(this.content)
    if (!match) return null

    return {
      text: match.text,
      portraitFrame: this.portraitFrame,
      addsFlag: match.addsFlag ?? null,
    }
  }
}
