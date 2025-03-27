const eventNames = ['ROUTER:LOGOUT', 'ROUTER:LOGIN', 'ROUTER:HOME','SYSTEM:THEME', 'SYSTEM:TOKEN', 'SYSTEM:LANGUAGE']
type EventNames = (typeof eventNames)[number]
class EventMitt {
  private listeners: Record<string, Set<Function>> = {
    'ROUTER:LOGOUT': new Set(),
    'ROUTER:LOGIN': new Set(),
    'ROUTER:HOME': new Set(),
    'SYSTEM:THEME': new Set(),
    'SYSTEM:TOKEN': new Set(),
    'SYSTEM:LANGUAGE': new Set()
  }
  on(event: EventNames, listener: Function) {
    if (!this.listeners[event]) return new Error('未注册该事件')
    this.listeners[event].add(listener)
  }
  emit(event: EventNames, ...args: any) {
    const listens = this.listeners[event]
    if (!listens) return new Error('未注册该事件')
    console.log('sdsd', listens)
    listens.forEach((litener: any) => {
      litener(...args)
    })
  }
  off(event: Event, listener: object) {
    const listens = this.listeners[event]
    if (!listens) return new Error('未注册该事件')
    listens.delete(listener)
  }
}

export default new EventMitt()
