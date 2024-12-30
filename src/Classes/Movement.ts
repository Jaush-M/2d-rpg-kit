export type Direction = typeof UP | typeof DOWN | typeof LEFT | typeof RIGHT

export const UP = 'UP'
export const DOWN = 'DOWN'
export const LEFT = 'LEFT'
export const RIGHT = 'RIGHT'

export class Movement {
  heldDirections: Direction[]
  enableArrowKeyMovement: boolean

  up
  down
  left
  right

  constructor({ up = 'KeyW', down = 'KeyS', left = 'KeyA', right = 'KeyD', enableArrowKeyMovement = true } = {}) {
    this.heldDirections = []
    this.enableArrowKeyMovement = enableArrowKeyMovement

    this.up = up
    this.down = down
    this.left = left
    this.right = right
  }

  get direction() {
    return this.heldDirections[0]
  }

  keyDownEvent(e: KeyboardEvent) {
    if (e.code === this.up || (this.enableArrowKeyMovement && e.code === 'ArrowUp')) {
      this.onMovementKeyPressed(UP)
    }
    if (e.code === this.down || (this.enableArrowKeyMovement && e.code === 'ArrowDown')) {
      this.onMovementKeyPressed(DOWN)
    }
    if (e.code === this.left || (this.enableArrowKeyMovement && e.code === 'ArrowLeft')) {
      this.onMovementKeyPressed(LEFT)
    }
    if (e.code === this.right || (this.enableArrowKeyMovement && e.code === 'ArrowRight')) {
      this.onMovementKeyPressed(RIGHT)
    }
  }

  keyUpEvent(e: KeyboardEvent) {
    if (e.code === this.up || (this.enableArrowKeyMovement && e.code === 'ArrowUp')) {
      this.onMovementKeyReleased(UP)
    }
    if (e.code === this.down || (this.enableArrowKeyMovement && e.code === 'ArrowDown')) {
      this.onMovementKeyReleased(DOWN)
    }
    if (e.code === this.left || (this.enableArrowKeyMovement && e.code === 'ArrowLeft')) {
      this.onMovementKeyReleased(LEFT)
    }
    if (e.code === this.right || (this.enableArrowKeyMovement && e.code === 'ArrowRight')) {
      this.onMovementKeyReleased(RIGHT)
    }
  }

  onMovementKeyPressed(direction: Direction) {
    if (this.heldDirections.indexOf(direction) === -1) {
      this.heldDirections.unshift(direction)
    }
  }

  onMovementKeyReleased(direction: Direction) {
    const index = this.heldDirections.indexOf(direction)
    if (index === -1) return

    this.heldDirections.splice(index, 1)
  }
}
