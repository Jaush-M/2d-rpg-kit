import { events } from '@/Classes/Events'
import { GameManager } from '@/Classes/GameManager'
import { GameObject } from '@/Classes/GameObject'
import { KeyboardBinding } from '@/Classes/KeyboardBinding'
import { resources } from '@/Classes/Resource'
import { Sprite } from '@/Classes/Sprite'
import { Vector2 } from '@/Classes/Vector2'
import { getCharacterFrame, getCharacterWidth } from '@/Objects/SpriteTextBox/spriteFontMap'

interface SpriteTextBoxProps {
  text: string
  portraitFrame?: null | number
  position?: Vector2
  showingIndex?: number
  textSpeed?: number
}

export class SpriteTextBox extends GameObject {
  text
  words
  backdrop
  portrait

  showingIndex
  finalIndex
  textSpeed
  timeUntilNextShow

  constructor({
    text,
    portraitFrame,
    position = new Vector2(33, 112),
    showingIndex = 0,
    textSpeed = 80,
  }: SpriteTextBoxProps) {
    super({
      position,
    })

    this.drawLayer = 'HUD'

    // Text box content
    this.text = text
    this.words = this.text.split(' ').map((word) => {
      let wordWidth = 0
      const chars = word.split('').map((char) => {
        const charWidth = getCharacterWidth(char)
        wordWidth += charWidth

        return {
          width: charWidth,
          sprite: new Sprite({
            resource: resources.images.spriteFont,
            hFrames: 13,
            vFrames: 6,
            frame: getCharacterFrame(char),
          }),
        }
      })

      return {
        wordWidth,
        chars,
      }
    })

    // Create background for text
    this.backdrop = new Sprite({
      resource: resources.images.textBox,
      frameSize: new Vector2(256, 64),
    })

    // Create a portrait
    this.portrait =
      typeof portraitFrame === 'number'
        ? new Sprite({
            resource: resources.images.portraits,
            hFrames: 4,
            frame: portraitFrame,
          })
        : null

    // Typewriter
    this.showingIndex = showingIndex
    this.finalIndex = this.words.reduce((acc, word) => acc + word.chars.length, 0)
    this.textSpeed = textSpeed
    this.timeUntilNextShow = this.textSpeed
  }

  step(delta: number, root: GameManager): void {
    // Listen for user input
    const bindings = root.bindings as KeyboardBinding
    if (bindings.getKeyJustPressed('Space')) {
      // Skip to end
      if (this.showingIndex < this.finalIndex) {
        this.showingIndex = this.finalIndex

        return
      }

      // Close text box
      events.emit('END_TEXT_BOX')
    }

    // Work on typewriter
    this.timeUntilNextShow -= delta

    const LETTERS_SHOWN = 1
    if (this.timeUntilNextShow <= 0) {
      this.timeUntilNextShow = this.textSpeed
      this.showingIndex += LETTERS_SHOWN
    }
  }

  drawImage(x: number, y: number): void {
    this.backdrop.drawImage(x, y)

    const PORTRAIT_OFFSET_LEFT = 6
    const PORTRAIT_OFFSET_TOP = 7
    const PORTRAIT_PADDING_LEFT = this.portrait ? 20 : 0
    const PORTRAIT_PADDING_TOP = this.portrait ? 2 : 0

    this.portrait?.drawImage(x + PORTRAIT_OFFSET_TOP, y + PORTRAIT_OFFSET_LEFT)

    const PADDING_LEFT = PORTRAIT_PADDING_LEFT + 7
    const PADDING_TOP = PORTRAIT_PADDING_TOP + 7
    const LETTER_SPACING = 1
    const LINE_HEIGHT = 14
    const MAX_WIDTH = 240

    const OFFSET_X = 5

    let cursorX = x + PADDING_LEFT
    let cursorY = y + PADDING_TOP
    let currentShowingIndex = 0

    this.words.forEach((word) => {
      const spaceRemaining = x + MAX_WIDTH - cursorX
      if (spaceRemaining < word.wordWidth) {
        cursorX = x + PADDING_LEFT
        cursorY += LINE_HEIGHT
      }

      word.chars.forEach(({ sprite, width }) => {
        if (currentShowingIndex > this.showingIndex) return

        const withCharOffset = cursorX - OFFSET_X
        sprite.drawImage(withCharOffset, cursorY)

        cursorX += width
        cursorX += LETTER_SPACING
        currentShowingIndex++
      })

      cursorX += getCharacterWidth(' ')
    })
  }
}
