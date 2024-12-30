class Events {
  nextId = 0
  callbacks: {
    id: number
    eventName: string
    caller: any
    callback: (props?: any) => void
  }[] = []

  // Emit events
  emit(eventName: string, value?: any) {
    this.callbacks.forEach((stored) => {
      if (stored.eventName === eventName) {
        stored.callback(value)
      }
    })
  }

  // Subscribe to events
  on(eventName: string, caller: any, callback: (props?: any) => void) {
    this.nextId++
    this.callbacks.push({
      id: this.nextId,
      eventName,
      caller,
      callback,
    })
    return this.nextId
  }

  // Unsubscribe from events
  off(id: number) {
    this.callbacks = this.callbacks.filter((stored) => stored.id !== id)
  }

  unsubscribe(caller: any) {
    this.callbacks = this.callbacks.filter((stored) => stored.caller !== caller)
  }
}

export const events = new Events()
