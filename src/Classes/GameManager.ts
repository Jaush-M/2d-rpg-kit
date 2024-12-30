import { Camera } from '@/Classes/Camera'
import { events } from '@/Classes/Events'
import { GameObject } from '@/Classes/GameObject'
import { KeyboardBinding } from '@/Classes/KeyboardBinding'
import { storyFlags } from '@/Classes/StoryFlags'
import { Inventory } from '@/Objects/Inventory/Inventory'
import { Level } from '@/Objects/Level/Level'
import { Npc } from '@/Objects/Npc/Npc'
import { SpriteTextBox } from '@/Objects/SpriteTextBox/SpriteTextBox'

export class GameManager extends GameObject {
  bindings
  camera

  level?: Level

  constructor() {
    super()
    this.bindings = new KeyboardBinding()
    this.camera = new Camera()
  }

  ready() {
    const inventory = new Inventory()
    this.addChild(inventory)

    // Subscribe to level change event
    events.on('CHANGE_LEVEL', this, (level: Level) => {
      this.setLevel(level)
    })

    //  Subscribe to player action event
    events.on('PLAYER_REQUESTS_ACTION', this, (withObject: GameObject) => {
      if (typeof withObject.getContent === 'function') {
        const content = (withObject as Npc).getContent()

        if (!content) return
        if (content.addsFlag) storyFlags.add(content.addsFlag)

        // Handle text box
        const textBox = new SpriteTextBox({ text: content.text, portraitFrame: content.portraitFrame })
        this.addChild(textBox)
        events.emit('START_TEXT_BOX')

        // Unsubscribe from text box after it's destroyed
        const endTextBoxSub = events.on('END_TEXT_BOX', this, () => {
          textBox.destroy()
          events.off(endTextBoxSub)
        })
      }
    })
  }

  setLevel(level: Level) {
    if (!level) return
    if (this.level) this.level.destroy()

    this.level = level
    this.addChild(level)
  }

  drawBackground() {
    this.level?.background?.drawImage()
  }

  drawObjects() {
    this.children.forEach((child) => child.drawLayer !== 'HUD' && child.draw())
  }

  drawForeground() {
    this.children.forEach((child) => child.drawLayer === 'HUD' && child.draw())
  }
}
