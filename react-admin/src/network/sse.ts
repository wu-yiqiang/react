import { EventSourcePolyfill } from 'event-source-polyfill'

export interface SSEParams {
  url: string
  config?: object
  retryCount?: number // 数值为0的时候表示无限重试
  onMessage: (event: MessageEvent) => void
  onOpen: () => void
  onError: (event: Event) => void
  onClose: () => void
  finallyHandler: () => void
}

class SSEService {
  private eventSource: EventSource | null = null
  private params: SSEParams
  private retryCount: number = Infinity
  private finallyHandler: (() => void) | undefined
  constructor(sseParams: SSEParams) {
    this.finallyHandler = sseParams.finallyHandler
    this.retryCount = sseParams?.retryCount ?? Infinity
    this.params = sseParams
  }
  connect() {
    this.eventSource = new EventSourcePolyfill(this.params.url, this.params.config)
    if (this.params.onOpen !== null) {
      if (this.eventSource?.onopen) {
        this.eventSource.onopen = this.params.onOpen
      }
    } else {
      if (this.eventSource?.onopen) {
        this.eventSource.onopen = () => {
          console.log('SSE 连接已开启')
        }
      }
    }
    if (this.params.onMessage != null) {
      if (this.eventSource?.onmessage) {
        this.eventSource.onmessage = this.params.onMessage
      } 
    } else {
      if (this.eventSource?.onmessage) {
          this.eventSource.onmessage = (event) => {
            console.log('收到消息：', JSON.parse(event?.data))
          }
      } 
    
    }
    if (this.eventSource?.onerror) {
      this.eventSource.onerror = (event) => {
        if (this.eventSource?.readyState === EventSource.CLOSED) {
          this.params.onClose()
        } else {
          this.params.onError(event)
          if (this.retryCount !== Infinity) {
            this.retryCount--
            if (!this.retryCount) {
              console.log('关闭了，不重试了')
              this.disconnect()
            }
          }
        }
        this.params.finallyHandler()
      }
    }
    
  }
  disconnect() {
    if (this.eventSource) {
      this.eventSource.close()
      if (this.finallyHandler != null) {
        this.finallyHandler()
      }
    }
  }
}

export default SSEService;
