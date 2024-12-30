export type StoryFlagScenarios = {
  text: string
  requires?: string[]
  bypass?: string[]
  addsFlag?: string
}[]

class StoryFlags {
  flags

  constructor() {
    this.flags = new Map()
  }

  add(flag: string) {
    this.flags.set(flag, true)
  }

  getRelevantScenario(scenarios: StoryFlagScenarios) {
    return scenarios.find((scenario) => {
      // Disqualify scenarios that has bypass flags
      const bypassFlags = scenario.bypass ?? []
      for (let i = 0; i < bypassFlags.length; i++) {
        if (this.flags.has(bypassFlags[i])) return false
      }

      // Disqualify scenarios that has missing required flags
      const requiredFlags = scenario.requires ?? []
      for (let i = 0; i < requiredFlags.length; i++) {
        if (!this.flags.has(requiredFlags[i])) return false
      }

      return true
    })
  }
}

export const TALKED_TO_A = 'TALKED_TO_A'
export const TALKED_TO_B = 'TALKED_TO_B'

export const storyFlags = new StoryFlags()
