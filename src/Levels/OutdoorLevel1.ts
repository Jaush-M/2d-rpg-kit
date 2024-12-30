import { events } from '@/Classes/Events'
import { resources } from '@/Classes/Resource'
import { Sprite } from '@/Classes/Sprite'
import { Vector2 } from '@/Classes/Vector2'
import { gridCells } from '@/Helpers/grid'
import { CaveLevel1 } from '@/Levels/CaveLevel1'
import { canvas } from '@/main'
import { Exit } from '@/Objects/Exit/Exit'
import { Ground } from '@/Objects/Ground/Ground'
import { Level } from '@/Objects/Level/Level'
import { Player } from '@/Objects/Player/Player'
import { Rod } from '@/Objects/Rod/Rod'

export class OutdoorLevel1 extends Level {
  background: Sprite

  constructor({ playerPosition = new Vector2(gridCells(6), gridCells(5)) } = {}) {
    super({
      playerPosition,
    })

    this.background = new Sprite({
      resource: resources.images.sky,
      frameSize: new Vector2(canvas.width, canvas.height),
    })

    const ground = new Ground(resources.images.ground)
    this.addChild(ground)

    const exit = new Exit(new Vector2(gridCells(6), gridCells(3)))
    this.addChild(exit)

    const player = new Player(this.playerPosition)
    this.addChild(player)

    const rod = new Rod(new Vector2(gridCells(7), gridCells(6)))
    this.addChild(rod)

    this.collisions = new Set()

    // Edges
    this.collisions.add('80,32')
    this.collisions.add('96,32')

    this.collisions.add('112,16')
    this.collisions.add('128,16')
    this.collisions.add('144,16')
    this.collisions.add('160,16')
    this.collisions.add('176,16')
    this.collisions.add('192,16')
    this.collisions.add('208,16')

    this.collisions.add('240,32')

    this.collisions.add('256,48')
    this.collisions.add('256,64')
    this.collisions.add('256,80')
    this.collisions.add('256,96')

    this.collisions.add('240,112')
    this.collisions.add('176,112')
    this.collisions.add('160,112')
    this.collisions.add('144,112')
    this.collisions.add('128,112')
    this.collisions.add('112,112')
    this.collisions.add('96,112')
    this.collisions.add('80,112')
    this.collisions.add('64,112')
    this.collisions.add('48,112')

    this.collisions.add('32,96')
    this.collisions.add('32,80')
    this.collisions.add('32,64')
    this.collisions.add('32,48')

    this.collisions.add('48,32')

    // House
    this.collisions.add('224,64')

    // Trees
    this.collisions.add('224,32')
    this.collisions.add('208,64')
    this.collisions.add('64,48')

    // Plateau
    this.collisions.add('64,64')
    this.collisions.add('64,80')
    this.collisions.add('80,64')
    this.collisions.add('80,80')

    this.collisions.add('128,48')
    this.collisions.add('144,48')

    // Water
    this.collisions.add('112,80')
    this.collisions.add('128,80')
    this.collisions.add('144,80')
    this.collisions.add('160,80')

    // Rocks
    this.collisions.add('192,96')
    this.collisions.add('208,96')
    this.collisions.add('224,96')
  }

  ready() {
    events.on('PLAYER_EXITS', this, () => {
      events.emit(
        'CHANGE_LEVEL',
        new CaveLevel1({
          playerPosition: new Vector2(gridCells(3), gridCells(6)),
        })
      )
    })
  }
}
