import { events } from '@/Classes/Events'
import { resources } from '@/Classes/Resource'
import { Sprite } from '@/Classes/Sprite'
import { TALKED_TO_A, TALKED_TO_B } from '@/Classes/StoryFlags'
import { Vector2 } from '@/Classes/Vector2'
import { gridCells } from '@/Helpers/grid'
import { OutdoorLevel1 } from '@/Levels/OutdoorLevel1'
import { canvas } from '@/main'
import { Exit } from '@/Objects/Exit/Exit'
import { Ground } from '@/Objects/Ground/Ground'
import { Level } from '@/Objects/Level/Level'
import { Knight } from '@/Objects/Knight/Knight'
import { Player } from '@/Objects/Player/Player'
import { Rod } from '@/Objects/Rod/Rod'

export class CaveLevel1 extends Level {
  constructor({ playerPosition = new Vector2(gridCells(6), gridCells(5)) } = {}) {
    super({
      playerPosition,
    })

    this.background = new Sprite({
      resource: resources.images.cave,
      frameSize: new Vector2(canvas.width, canvas.height),
    })

    const ground = new Ground(resources.images.caveGround)
    this.addChild(ground)

    const exit = new Exit(new Vector2(gridCells(3), gridCells(5)))
    this.addChild(exit)

    const player = new Player(this.playerPosition)
    this.addChild(player)

    const rod = new Rod(new Vector2(gridCells(9), gridCells(6)))
    this.addChild(rod)

    const npc1 = new Knight({
      position: new Vector2(gridCells(5), gridCells(5)),
      content: [
        {
          text: "I just can't stand that guy.",
          requires: [TALKED_TO_B],
          bypass: [TALKED_TO_A],
          addsFlag: TALKED_TO_A,
        },
        {
          text: 'He is just the worst!',
          requires: [TALKED_TO_A],
        },
        {
          text: 'Grumble grumble. Another day at work.',
        },
      ],
      portraitFrame: null,
    })
    this.addChild(npc1)

    const npc2 = new Knight({
      position: new Vector2(gridCells(9), gridCells(5)),
      content: [{ text: 'What a wonderful day at work in the cave!', addsFlag: TALKED_TO_B }],
    })
    this.addChild(npc2)

    this.collisions = new Set()

    // Edges
    this.collisions.add('32,0')
    this.collisions.add('48,0')
    this.collisions.add('64,0')
    this.collisions.add('80,0')
    this.collisions.add('96,0')
    this.collisions.add('112,0')
    this.collisions.add('128,0')
    this.collisions.add('144,0')
    this.collisions.add('160,0')
    this.collisions.add('176,0')
    this.collisions.add('192,0')
    this.collisions.add('208,0')
    this.collisions.add('224,0')
    this.collisions.add('240,0')
    this.collisions.add('256,0')
    this.collisions.add('272,0')

    this.collisions.add('288,16')
    this.collisions.add('288,32')
    this.collisions.add('288,48')
    this.collisions.add('288,64')
    this.collisions.add('288,80')
    this.collisions.add('288,96')
    this.collisions.add('288,112')

    this.collisions.add('272,128')
    this.collisions.add('256,128')
    this.collisions.add('240,128')
    this.collisions.add('224,128')
    this.collisions.add('208,128')
    this.collisions.add('192,128')
    this.collisions.add('176,128')
    this.collisions.add('160,128')
    this.collisions.add('144,128')
    this.collisions.add('128,128')
    this.collisions.add('112,128')
    this.collisions.add('96,128')
    this.collisions.add('80,128')
    this.collisions.add('64,128')
    this.collisions.add('48,128')
    this.collisions.add('32,128')

    this.collisions.add('16,112')
    this.collisions.add('16,96')
    this.collisions.add('16,80')
    this.collisions.add('16,64')
    this.collisions.add('16,48')
    this.collisions.add('16,32')
    this.collisions.add('16,16')

    // Rocks
    this.collisions.add('32,64')
    this.collisions.add('48,64')
    this.collisions.add('144,16')
    this.collisions.add('192,32')
    this.collisions.add('208,32')
    this.collisions.add('208,48')
    this.collisions.add('256,80')

    // Plateau
    this.collisions.add('48,16')
    this.collisions.add('64,16')
    this.collisions.add('80,48')
    this.collisions.add('96,48')
    this.collisions.add('96,64')
    this.collisions.add('112,64')
    this.collisions.add('128,48')
    this.collisions.add('192,80')
    this.collisions.add('208,80')
    this.collisions.add('224,96')

    // Water
    this.collisions.add('256,32')
    this.collisions.add('240,32')
    this.collisions.add('208,96')
    this.collisions.add('192,96')
    this.collisions.add('176,96')
    this.collisions.add('128,96')
    this.collisions.add('112,96')
    this.collisions.add('96,96')
  }

  ready() {
    events.on('PLAYER_EXITS', this, () => {
      events.emit(
        'CHANGE_LEVEL',
        new OutdoorLevel1({
          playerPosition: new Vector2(gridCells(6), gridCells(4)),
        })
      )
    })
  }
}
