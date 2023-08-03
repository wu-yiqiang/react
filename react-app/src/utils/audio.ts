export class Ring {
  private static instance: HTMLAudioElement | null = null
  private static src: string = ''
  /* 
    单例模式
  */
  constructor(src: string) {
  }
  private static getInstance(src: string) {
    if (!Ring.instance) Ring.instance = new Audio()
    Ring.instance.src = src
    return Ring.instance
  }
}
