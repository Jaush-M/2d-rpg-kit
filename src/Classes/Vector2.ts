import { Direction, DOWN, LEFT, RIGHT, UP } from '@/Classes/Movement'

export class Vector2 {
  x: number
  y: number

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  duplicate() {
    return new Vector2(this.x, this.y)
  }

  matches(other: Vector2) {
    return this.x === other.x && this.y === other.y
  }

  toNeighbor(direction: Direction, pixelSize = 16) {
    let x = this.x
    let y = this.y

    if (direction === UP) y -= pixelSize
    else if (direction === DOWN) y += pixelSize
    else if (direction === LEFT) x -= pixelSize
    else if (direction === RIGHT) x += pixelSize

    return new Vector2(x, y)
  }
}
