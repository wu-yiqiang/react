export const isDark = (theme: string) => {
  const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)')?.matches
  return theme == 'system' && isDarkTheme ? true : theme == 'system' && !isDarkTheme ? false : theme == 'dark' ? true : false
}


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

// 数组差集
export const diff = (arr1: Array<number | string>, arr2: Array<number | string>) => Array.from(new Set(union(arr1, arr2).filter((item) => !cross(arr1, arr2).includes(item))))

// 数组并集
export const union = (arr1: Array<string | number>, arr2:Array<string | number>): Array<string | number> => Array.from(new Set([...arr1, ...arr2]));
// 数组交集
export const cross = (arr1: Array<number | string>, arr2: Array<number | string>) => Array.from(new Set(arr1.filter((item) =>
    arr2.includes(item))));