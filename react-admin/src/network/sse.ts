export interface SSEChatParams {
  url: string
  onmessage: (event: MessageEvent) => void
  onopen: () => void
  finallyHandler: () => void
}

class SSEService {
  private eventSource: EventSource | null = null
  private finallyHandler: (() => void) | undefined

  connect(sseChatParams: SSEChatParams) {
    this.finallyHandler = sseChatParams.finallyHandler
    this.eventSource = new EventSource(sseChatParams.url)

    if (sseChatParams.onopen != null) {
      this.eventSource.onopen = sseChatParams.onopen
    } else {
      this.eventSource.onopen = () => {
        console.log('SSE 连接已开启')
      }
    }
    if (sseChatParams.onmessage != null) {
      this.eventSource.onmessage = sseChatParams.onmessage
    } else {
      this.eventSource.onmessage = (event) => {
        console.log('收到消息：', JSON.parse(event?.data))
      }
    }

    this.eventSource.onerror = (error) => {
      if (this.eventSource?.readyState === EventSource.CLOSED) {
        console.log('SSE 连接已关闭')
      } else {
        console.error('SSE 错误：', error)
      }
      sseChatParams.finallyHandler()
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

export const sseService = new SSEService()
