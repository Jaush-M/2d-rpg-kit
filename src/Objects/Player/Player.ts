import { Animations } from '@/Classes/Animations'
import { events } from '@/Classes/Events'
import { FrameIndexPattern } from '@/Classes/FrameIndexPattern'
import { GameObject } from '@/Classes/GameObject'
import { Direction, DOWN, LEFT, RIGHT, UP } from '@/Classes/Movement'
import {
  PICK_UP_DOWN,
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
  STAND_UP,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP,
} from '@/Objects/Player/playerAnimation'
import { ImageProps, resources } from '@/Classes/Resource'
import { Sprite } from '@/Classes/Sprite'
import { Vector2 } from '@/Classes/Vector2'
import { hasCollision } from '@/Helpers/grid'
import { moveTowards } from '@/Helpers/moveTowards'
import { GameManager } from '@/Classes/GameManager'
import { KeyboardBinding } from '@/Classes/KeyboardBinding'

export class Player extends GameObject {
  locked

  body
  facingDirection: Direction
  destinationPosition
  itemPickupTime
  itemPickupShell: GameObject | undefined

  constructor(position = new Vector2(0, 0), offset = new Vector2(-8, -20)) {
    super({
      position,
      offset,
    })

    this.locked = false

    const shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32, 32),
      offset: new Vector2(0, 1),
    })
    this.addChild(shadow)

    this.body = new Sprite({
      resource: resources.images.player,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      vFrames: 8,
      frame: 1,
      animations: new Animations({
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkUp: new FrameIndexPattern(WALK_UP),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        walkRight: new FrameIndexPattern(WALK_RIGHT),

        standDown: new FrameIndexPattern(STAND_DOWN),
        standUp: new FrameIndexPattern(STAND_UP),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        standRight: new FrameIndexPattern(STAND_RIGHT),

        pickUpDown: new FrameIndexPattern(PICK_UP_DOWN),
      }),
    })
    this.addChild(this.body)

    this.facingDirection = DOWN
    this.destinationPosition = this.position.duplicate()
    this.itemPickupTime = 0

    events.on('PLAYER_PICKUP_ITEM', this, (data) => {
      this.onPickUpItem(data)
    })
  }

  ready(): void {
    events.on('START_TEXT_BOX', this, () => {
      this.locked = true
    })
    events.on('END_TEXT_BOX', this, () => {
      this.locked = false
    })
  }

  step(delta: number, root: GameManager): void {
    if (this.locked) return

    // Lock movement if item is being picked up
    if (this.itemPickupTime > 0) {
      this.workOnItemPickup(delta)
      return
    }

    const bindings = root.bindings as KeyboardBinding
    if (bindings.getKeyJustPressed('Space')) {
      const objAtPos = this.parent?.children.find((c) =>
        c.position.matches(this.position.toNeighbor(this.facingDirection))
      )

      if (objAtPos) {
        events.emit('PLAYER_REQUESTS_ACTION', objAtPos)
      }
    }

    const distance = moveTowards(this, this.destinationPosition, 1)
    const hasArrived = distance <= 1

    if (hasArrived) {
      this.move(root)
    }

    this.tryEmitPosition()
  }

  tryEmitPosition() {
    if (this.lastX === this.position.x && this.lastY === this.position.y) return

    this.lastX = this.position.x
    this.lastY = this.position.y

    events.emit('PLAYER_POSITION', this.position)
  }

  move(root: GameManager) {
    const { bindings: _bindings } = root
    const bindings = _bindings as KeyboardBinding

    if (!bindings.movement) return

    if (!bindings.movement.direction) {
      if (this.facingDirection === DOWN) this.body.animations?.play('standDown')
      if (this.facingDirection === UP) this.body.animations?.play('standUp')
      if (this.facingDirection === LEFT) this.body.animations?.play('standLeft')
      if (this.facingDirection === RIGHT) this.body.animations?.play('standRight')

      return
    }

    const gridSize = 16

    let nextX = this.destinationPosition.x
    let nextY = this.destinationPosition.y

    if (bindings.movement.direction === UP) {
      nextY -= gridSize
      this.body.animations?.play('walkUp')
    }
    if (bindings.movement.direction === DOWN) {
      nextY += gridSize
      this.body.animations?.play('walkDown')
    }
    if (bindings.movement.direction === LEFT) {
      nextX -= gridSize
      this.body.animations?.play('walkLeft')
    }
    if (bindings.movement.direction === RIGHT) {
      nextX += gridSize
      this.body.animations?.play('walkRight')
    }

    this.facingDirection = bindings.movement.direction ?? this.facingDirection

    // Check collision
    const isSpaceFree = !hasCollision(root.level?.collisions, nextX, nextY)
    const solidBodyAtSpace = this.parent?.children.find(
      (c) => c.isSolid && c.position.x === nextX && c.position.y === nextY
    )

    if (isSpaceFree && !solidBodyAtSpace) {
      this.destinationPosition.x = nextX
      this.destinationPosition.y = nextY
    }
  }

  onPickUpItem({ image, position }: { image: ImageProps; position: Vector2 }) {
    // Land on the item
    this.destinationPosition = position.duplicate()

    // Start pickup animation
    this.itemPickupTime = 500

    this.itemPickupShell = new GameObject()
    this.itemPickupShell.addChild(new Sprite({ resource: image, position: new Vector2(8, 0) }))
    this.addChild(this.itemPickupShell)
  }

  workOnItemPickup(delta: number) {
    this.itemPickupTime -= delta
    this.body.animations?.play('pickUpDown')

    if (this.itemPickupTime <= 0) {
      this.itemPickupShell?.destroy()
    }
  }
}
