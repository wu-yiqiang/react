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
  private static getInstance(src: string) {
    if (!Ring.instance) Ring.instance = new Audio()
    Ring.instance.muted = true
    Ring.instance.src = src
    return Ring.instance
  }
}
