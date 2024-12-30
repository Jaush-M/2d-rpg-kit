export interface ImageProps {
  image: HTMLImageElement
  isLoaded: boolean
}

class Resource<T extends Record<string, string> = any> {
  toLoad: T
  images: { [key in keyof T]: ImageProps }

  constructor(toLoad: T) {
    this.toLoad = toLoad

    this.images = {} as { [key in keyof T]: ImageProps }

    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image()
      img.src = this.toLoad[key]
      img.onload = () => {
        this.images[key].isLoaded = true
      }

      this.images[key as keyof T] = {
        image: img,
        isLoaded: false,
      }
    })
  }
}

export const resources = new Resource({
  // Player
  player: '/sprites/hero-sheet.png',
  shadow: '/sprites/shadow.png',

  // NPC
  knight1: '/sprites/knight-sheet-1.png',

  // HUD
  portraits: '/sprites/portraits-sheet.png',
  textBox: '/sprites/text-box.png',
  spriteFont: '/sprites/sprite-font-white.png',

  // Items
  rod: '/sprites/rod.png',

  // Outdoor
  ground: '/sprites/ground.png',
  sky: '/sprites/sky.png',

  // Cave
  cave: '/sprites/cave.png',
  caveGround: '/sprites/cave-ground.png',

  // Exit
  exit: '/sprites/exit.png',
})
