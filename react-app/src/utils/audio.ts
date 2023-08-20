export class Ring {
  private static instance: HTMLAudioElement | null = null
  private static src: string = ''
  // private static srcLists: Array<string> = []
  /* 
    单例模式
  */
  constructor(src: string) {
    // this.getSrc()
  }
  // private static getSrc() {
  //   if (!Ring.instance) Ring.instance = new Audio()
  //   Ring.instance.src = src
  //   return Ring.instance
  // }
  private static async loadModule(src: string) {
    const module = await import(src)
    return module.default
  }
  private static async getInstance(src: string) {
    if (!Ring.instance) Ring.instance = new Audio()
    Ring.instance.src = await this.loadModule(src)
    // Ring.instance.load()
    Ring.instance.play()
    return Ring.instance
  }
}
