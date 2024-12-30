import { FrameIndexPattern } from '@/Classes/FrameIndexPattern'

export class Animations<T extends Record<string, FrameIndexPattern> = any> {
  patterns: T
  activeKey: keyof T

  constructor(patterns: T) {
    this.patterns = patterns
    this.activeKey = Object.keys(this.patterns)[0]
  }

  get frame() {
    return this.patterns[this.activeKey].frame
  }

  play(key: keyof T, startAtTime = 0) {
    if (this.activeKey === key) return

    this.activeKey = key
    this.patterns[this.activeKey].currentTime = startAtTime
  }

  step(delta: number) {
    this.patterns[this.activeKey].step(delta)
  }
}
