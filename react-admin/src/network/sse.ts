export interface SSEParams {
  url: string,
  token: string,
  retryCount: number, // 数值为0的时候表示无限重试
  onMessage: (event: MessageEvent) => void
  onOpen: () => void
  onError: (event: Event) => void
  onClose: () => void
  finallyHandler: () => void
}

class SSEService {
  private eventSource: EventSource | null = null
  private params: SSEParams
  private retryConnectCount: number = 0
  private retryCount: number = 0
  private finallyHandler: (() => void) | undefined
  constructor(sseParams: SSEParams) {
    this.finallyHandler = sseParams.finallyHandler
    this.retryCount = sseParams.retryCount ?? 0
    this.params = sseParams
  }
  connect() {
    this.eventSource = new EventSource(this.params.url)
    if (this.params.onOpen != null) {
      this.eventSource.onopen = this.params.onOpen
    } else {
      this.eventSource.onopen = () => {
        console.log('SSE 连接已开启')
      }
    }
    if (this.params.onMessage != null) {
      this.eventSource.onmessage = this.params.onMessage
    } else {
      this.eventSource.onmessage = (event) => {
        console.log('收到消息：', JSON.parse(event?.data))
      }
    }

    this.eventSource.onerror = (event) => {
      if (this.eventSource?.readyState === EventSource.CLOSED) {
        this.params.onClose()
      } else {
        this.params.onError(event)
        if (this.retryCount) {
          this.retryConnectCount++
          if (this.retryConnectCount === this.retryCount) {
            console.log("关闭了，不重试了")
            this.disconnect()
          }
        }

      }
      this.params.finallyHandler()
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
