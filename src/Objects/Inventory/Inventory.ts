import { events } from '@/Classes/Events'
import { GameObject } from '@/Classes/GameObject'
import { ImageProps, resources } from '@/Classes/Resource'
import { Sprite } from '@/Classes/Sprite'
import { Vector2 } from '@/Classes/Vector2'

export class Inventory extends GameObject {
  nextId
  items: { id: number; image: ImageProps }[]

  constructor(position = new Vector2(0, 1)) {
    super({
      position,
    })

    this.drawLayer = 'HUD'

    this.nextId = 0
    this.items = [
      {
        id: -1,
        image: resources.images.rod,
      },
      {
        id: -2,
        image: resources.images.rod,
      },
    ]

    events.on('PLAYER_PICKUP_ITEM', this, (data) => {
      this.items.push({
        id: this.nextId,
        image: data.image,
      })
      this.nextId++

      this.renderInventory()
    })

    // Draw initial inventory
    this.renderInventory()
  }

  renderInventory() {
    // Remove stale drawings
    this.children.forEach((child) => child.destroy())

    // Draw from inventory
    this.items.forEach(
      (item: { id: number; image: ImageProps }, index: number) => {
        const px = 12
        const sprite = new Sprite({
          resource: item.image,
          offset: new Vector2(index * px, 0),
        })
        this.addChild(sprite)
      }
    )
  }

  removeFromInventory(id: number) {
    this.items = this.items.filter((item) => item.id !== id)
    this.renderInventory()
  }
}
