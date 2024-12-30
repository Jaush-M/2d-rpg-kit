import { GameObject } from '@/Classes/GameObject'
import { resources } from '@/Classes/Resource'
import { Sprite } from '@/Classes/Sprite'
import { Vector2 } from '@/Classes/Vector2'
import { ctx } from '@/main'

export class TextBox extends GameObject {
  backdrop
  content

  constructor(content = '', position = new Vector2(16, 56)) {
    super({
      position,
    })

    this.drawLayer = 'HUD'

    this.content = content
    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    })
  }

  drawImage(x: number, y: number) {
    this.backdrop.drawImage(x, y)

    ctx.font = '12px fontRetroGaming'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillStyle = '#fff'

    const MAX_WIDTH = 250
    const LINE_HEIGHT = 20
    const PADDING_LEFT = 10
    const PADDING_TOP = 12

    const words = this.content?.split(' ') ?? []
    let line = ''

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' '
      const metrics = ctx.measureText(testLine)
      const testWidth = metrics.width

      // Check if the line exceeds the maximum width
      if (testWidth > MAX_WIDTH) {
        if (n === 0) return
        // Draw the current line
        ctx.fillText(line, x + PADDING_LEFT, y + PADDING_TOP)
        // Reset line to start with current word
        line = words[n] + ' '
        // Move to the next line
        y += LINE_HEIGHT
      } else {
        line = testLine
      }
    }

    ctx.fillText(this.content, x + PADDING_LEFT, y + PADDING_TOP)
  }
}
