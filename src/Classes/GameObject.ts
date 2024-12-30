import { partition } from 'lodash-es'

import { events } from '@/Classes/Events'
import { Vector2 } from '@/Classes/Vector2'
import { GameManager } from '@/Classes/GameManager'

export class GameObject {
  position
  offset
  isReady
  isSolid
  children: GameObject[]
  drawLayer?: 'BASE' | 'FLOOR' | 'HUD'
  parent?: GameObject;

  [key: string]: any

  constructor({ position = new Vector2(0, 0), offset = new Vector2(0, 0) } = {}) {
    this.position = position
    this.offset = offset
    this.isReady = false
    this.isSolid = false
    this.children = []
  }

  stepEntry(delta: number, root: GameManager) {
    // Call updates on all children
    this.children.forEach((child) => child.stepEntry(delta, root))

    // Call ready on the first frame
    if (!this.isReady) {
      this.isReady = true
      this.ready()
    }

    // Call any implemented step method
    this.step(delta, root)
  }

  // Called before the first `step`
  ready() {
    // ...
  }

  // Called once every frame
  step(delta: number, root: GameManager) {
    // ...
  }

  draw(x = 0, y = 0) {
    const drawPosX = x + this.position.x + this.offset.x
    const drawPosY = y + this.position.y + this.offset.y

    this.drawImage(drawPosX, drawPosY)

    this.getDrawChildrenOrdered().forEach((child) => child.draw(drawPosX, drawPosY))
  }

  getDrawChildrenOrdered() {
    const [layers, base] = partition(this.children, (child) => !!child.drawLayer)

    layers.sort((a, b) => {
      if (b.drawLayer === 'BASE') return 1
      else if (b.drawLayer === 'FLOOR' && a.drawLayer !== 'BASE') return 1

      return -1
    })

    base.sort((a, b) => (a.position.y > b.position.y ? 1 : -1))

    return [...layers, ...base]
  }

  drawImage(x: number, y: number) {
    // ...
  }

  destroy() {
    this.children.forEach((child) => child.destroy())
    this.parent?.removeChild(this)
  }

  addChild(child: GameObject) {
    child.parent = this
    this.children.push(child)
  }

  removeChild(child: GameObject) {
    events.unsubscribe(child)
    this.children = this.children.filter((c) => child !== c)
  }
}
