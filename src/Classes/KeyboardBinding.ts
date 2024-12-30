import { Movement } from '@/Classes/Movement'

export class KeyboardBinding {
  keys: Record<KeyboardEvent['code'], boolean>
  lastKeys: Record<KeyboardEvent['code'], boolean>

  movement

  constructor() {
    this.keys = {}
    this.lastKeys = {}

    this.movement = new Movement()

    document.addEventListener('keydown', (e) => {
      this.keys[e.code] = true

      this.movement.keyDownEvent(e)
    })

    document.addEventListener('keyup', (e) => {
      this.keys[e.code] = false

      this.movement.keyUpEvent(e)
    })
  }

  // Update keys on new frame
  update() {
    this.lastKeys = { ...this.keys }
  }

  getKeyJustPressed(key: KeyboardEvent['code']) {
    let justPressed = false
    if (this.keys[key] && !this.lastKeys[key]) {
      justPressed = true
    }
    return justPressed
  }
}
