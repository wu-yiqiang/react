export const isDark = (theme: string) => {
  const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)')?.matches
  return theme == 'system' && isDarkTheme ? true : theme == 'system' && !isDarkTheme ? false : theme == 'dark' ? true : false
}

// export const timeInterval = (startTime: number, interval: number = 1000, func: Function) => {
//     requestAnimationFrame(() => {
//         const delay = new Date().getTime() - startTime
//         if (delay <= interval) {
//           func()
//         }
//   })
//   timeInterval(startTime, interval, func)
// }

export class TimeInterval {
  interval: number
  fn: Function
  lastTime: number
  timer: any
  constructor(fn: Function, interval: number = 500) {
    this.interval = interval
    this.fn = fn
    this.lastTime = 0
    this.loop(0)
  }
  loop(timestamp: number) {
    this.timer = requestAnimationFrame(TimeInterval.prototype.loop.bind(this))
    if (timestamp - this.lastTime > this.interval) {
      this.lastTime = timestamp
      typeof this.fn == 'function' && this.fn()
    }
  }
  clear() {
    cancelAnimationFrame(this.timer)
    this.timer = null
  }
}
