
const SOCKET_STATUS = {
    CONNECTING: "connecting",
    CONNECTED: "connected",
    DISCONNECTED: "disconnected",
    RECONNECTING: "reconnecting",
    CLOSED: "closed",
};

interface BASEINFO {
    url: string
    token?: string | null
}

type TYPESOCKET_STATUS = typeof SOCKET_STATUS
type SOCKET_STATUS_TYPE = TYPESOCKET_STATUS[keyof TYPESOCKET_STATUS]
export interface Options {
    heartbeatInterval: number
    reconnectDelay: number
    pingMessage: string
    pongMessage: string
    debug: boolean
    maxReconnectAttempts: number
    onMessage: (data: unknown) => void
    onOpen: () => void
    onError: (event: Event) => void
    onClose: () => void
    onReconnect: () => void
    onStatusChange: (status: SOCKET_STATUS_TYPE) => void
    onConnecting: () => void
}

export class WSocket {
    private url: string // 连接地址
    private token: string | null // token
    private socket: WebSocket | null // socket实例
    private heartbeatInterval: number // 心跳间隔时间
    private reconnectDelay: number // 重连等待时间
    private pingMessage: string // 发送心跳消息内容
    private pongMessage: string // 响应心跳消息内容
    private debug: boolean // 是否启用调试日志
    private maxReconnectAttempts: number // 最大重连次数
    private isConnected: boolean // 当前是否连接成功
    private isReconnecting: boolean // 当前是否正在重连
    private manualClose: boolean // 当前是手动关闭
    private reconnectAttempts: number // 当前重连尝试次数
    private lastPongTime: number | null // 上一次收到pong的时间戳
    private heartbeatTimer: number | null  // 心跳定时器
    private reconnectTimer: number | null // 重连定时器

    private onMessage: (data: unknown) => void // 接收到非心跳消息时的回调
    private onOpen: () => void // 连接成功时的回调
    private onError: (event: Event) => void // 连接错误时的回调
    private onClose: () => void // 连接关闭时的回调
    private onReconnect: () => void // 尝试重连时的回调
    private onStatusChange: (status: SOCKET_STATUS_TYPE) => void // 任意状态变更时的回调（如 connected, disconnected, reconnecting, closed, connecting）
    private onConnecting: () => void // 启动连接前的回调（包括首次连接 & 重连）

    constructor(baseInfo: BASEINFO, options: Options) {
        this.url = baseInfo?.url;
        this.token = baseInfo?.token ?? null
        this.socket = null;
        this.heartbeatInterval = options?.heartbeatInterval || 10000;
        this.reconnectDelay = options.reconnectDelay || 5000;
        this.pingMessage = options.pingMessage || "ping";
        this.pongMessage = options.pongMessage || "pong";
        this.debug = options.debug || false;
        this.maxReconnectAttempts = options.maxReconnectAttempts || Infinity;

        const noop = () => { };
        this.onMessage = options.onMessage || noop;
        this.onOpen = options.onOpen || noop;
        this.onError = options.onError || noop;
        this.onClose = options.onClose || noop;
        this.onReconnect = options.onReconnect || noop;
        this.onStatusChange = options.onStatusChange || noop;
        this.onConnecting = options.onConnecting || noop;

        this.isConnected = false;
        this.isReconnecting = false;
        this.manualClose = false;
        this.reconnectAttempts = 0;
        this.lastPongTime = null;
        this.heartbeatTimer = null;
        this.reconnectTimer = null;

        this.init();
    }
    /**
     * 获取当前 WebSocket 连接状态（供外部状态感知使用）
     * @returns {string} - 当前状态
     */
    getStatus() {
        if (this.isConnected) return SOCKET_STATUS.CONNECTED;
        if (this.isReconnecting) return SOCKET_STATUS.RECONNECTING;
        if (this.socket && this.socket.readyState === WebSocket.CONNECTING)
            return SOCKET_STATUS.CONNECTING;
        return SOCKET_STATUS.DISCONNECTED;
    }

    /**
     * 初始化 WebSocket 连接并设置事件监听
     */
    init() {
        this.manualClose = false; // 每次新建连接都重置
        this.onStatusChange(SOCKET_STATUS.CONNECTING); // 新增：状态回调
        this.onConnecting(); // 页面可用来显示 loading
        this.socket = this.token ? new WebSocket(this.url, this.token) : new WebSocket(this.url);

        // 连接成功
        this.socket.onopen = () => {
            this.isConnected = true;
            this.isReconnecting = false;
            this.reconnectAttempts = 0;
            this.debug && console.log("WebSocket opened.");
            this.onStatusChange("connected");
            this.onOpen();
            this.startHeartbeat();
        };

        // 接收消息
        this.socket.onmessage = (msg) => {
            // 处理 pong 响应（心跳回复）
            if (msg?.data === this.pongMessage) {
                this.lastPongTime = Date.now(); // 记录收到心跳回应时间
                return; // 不传给业务逻辑
            }
            this.onMessage(msg); // 非心跳业务消息，转发给用户
        };

        // 连接出错
        this.socket.onerror = (event: Event) => {
            this.debug && console.error("WebSocket error:", event);
            this.onError(event);
        };

        // 连接关闭
        this.socket.onclose = () => {
            this.debug && console.warn("WebSocket closed.");
            this.isConnected = false;
            this.stopHeartbeat();
            this.onClose();
            this.onStatusChange("disconnected");

            if (!this.manualClose) {
                this.debug &&
                    console.warn(
                        "WebSocket closed unexpectedly, attempting to reconnect..."
                    );
                this.reconnect();
            } else {
                this.debug && console.log("WebSocket closed manually, no reconnect.");
            }
        };
    }

    /**
     * 手动连接（用于取消自动重连并立即发起连接）
     */
    manualConnect() {
        this.clearReconnectTimer(); // 清除已有的重连定时器
        this.isReconnecting = false; // 重置重连标记
        this.reconnectAttempts = 0; // 重置尝试次数
        this.manualClose = false; // 标记为非手动关闭
        this.init(); // 发起连接
    }
    /**
     * 启动心跳检测，定时发送心跳消息
     */
    startHeartbeat() {
        this.stopHeartbeat(); // 防止重复定时器
        this.heartbeatTimer = setInterval(() => {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(this.pingMessage);
                this.debug && console.log("Heartbeat sent:", this.pingMessage);
            }
        }, this.heartbeatInterval);
    }

    /**
     * 停止心跳检测
     */
    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }

    /**
     * 重连逻辑（含延时与重试限制）
     */
    reconnect() {
        // 已在重连中则不重复触发
        if (this.reconnectTimer || this.isReconnecting) return;
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            this.debug &&
                console.warn("Max reconnect attempts reached, stopping reconnect.");
            this.clearReconnectTimer();
            return;
        }

        this.isReconnecting = true;
        this.reconnectAttempts++;
        this.onStatusChange(SOCKET_STATUS.RECONNECTING);
        this.onReconnect(); // 调用重连回调

        // 延迟执行重连
        this.reconnectTimer = setTimeout(() => {
            this.clearReconnectTimer();
            this.socket = null; // 销毁旧连接引用
            this.debug &&
                console.log(`Reconnecting... (Attempt ${this.reconnectAttempts})`);
            this.init();
        }, this.reconnectDelay);
    }

    /**
     * 清除重连定时器
     */
    clearReconnectTimer() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
    }
    /**
     * 发送消息，如果是对象会自动序列化为 JSON 字符串
     * @param {string|Object} data - 要发送的数据
     */
    send(data: string | object) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            if (typeof data === "object") {
                data = JSON.stringify(data); // 如果是对象，自动序列化为 JSON 字符串
            }
            this.socket.send(data);
        } else {
            this.debug && console.warn("WebSocket 未连接，发送失败");
        }
    }


    /**
     * 主动关闭连接（将不再自动重连）
     */
    close() {
        this.manualClose = true; // 设置手动关闭标记
        this.stopHeartbeat();
        this.clearReconnectTimer();
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        this.isConnected = false;
        this.isReconnecting = false;
        this.onStatusChange("closed");
    }
}
