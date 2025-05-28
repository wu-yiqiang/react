const eventNames = ['ROUTER:LOGOUT', 'ROUTER:BACK', 'SYSTEM:THEME', 'SYSTEM:LANGUAGE', 'SYSTEM:LOCKSCREEN', 'STORE:USER', 'ROUTER:KEY', 'ROUTER:OPENMENU']
type EventNames = (typeof eventNames)[number]
class EventMitt {
  private listeners: Record<string, Set<Function>> = {
    'ROUTER:LOGOUT': new Set(),
    'SYSTEM:THEME': new Set(),
    'SYSTEM:LOCKSCREEN': new Set(),
    'SYSTEM:LANGUAGE': new Set(),
    'STORE:USER': new Set(),
    'ROUTER:KEY': new Set(),
    'ROUTER:BACK': new Set(),
    'ROUTER:OPENMENU': new Set()
  }
  on(event: EventNames, listener: Function) {
    if (!this.listeners[event]) return new Error('未注册该事件')
    this.listeners[event].add(listener)
  }
  emit(event: EventNames, ...args: any) {
    const listens = this.listeners[event]
    if (!listens) return new Error('未注册该事件')
    listens.forEach((litener: any) => {
      litener(...args)
    })
  }
  off(event: Event, listener: object) {
    const listens = this.listeners[event as unknown as EventNames];
    if (!listens) return new Error('未注册该事件')
    listens.delete(listener as Function)
  }
}

export default new EventMitt()
