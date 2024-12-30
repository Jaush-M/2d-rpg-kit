export class GameLoop {
  update: (delta: number) => void
  render: () => void

  private rafId: null | number
  private isRunning: boolean

  private lastFrameTime: number
  private timeEllapsed: number
  private frameInterval: number

  constructor(update: (delta: number) => void, render: () => void) {
    this.update = update
    this.render = render

    this.rafId = null
    this.isRunning = false

    this.timeEllapsed = 0
    this.lastFrameTime = 0
    this.frameInterval = 1000 / 60
  }

  animate = (timestamp: number) => {
    if (!this.isRunning) return

    let deltaTime = timestamp - this.lastFrameTime
    this.lastFrameTime = timestamp

    this.timeEllapsed += deltaTime

    while (this.timeEllapsed >= this.frameInterval) {
      this.update(this.frameInterval)
      this.timeEllapsed -= this.frameInterval
    }

    this.render()

    this.rafId = requestAnimationFrame(this.animate)
  }

  start() {
    if (this.isRunning) return

    this.rafId = requestAnimationFrame(this.animate)
    this.isRunning = true
  }

  stop() {
    if (!this.rafId) return

    cancelAnimationFrame(this.rafId)
    this.isRunning = false
  }
}
