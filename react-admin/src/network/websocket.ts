// interface Ioptions {
//     token?: string;
//     heart_time?: number;
//     check_time?: number;
//     lock_time?: number;
// }

// const createSocket = (url: string, callback: (e: unknown) => void) => {

//     class Ws {
//         private url: string = url
//         private callback: (e: unknown) => void = callback
//         private heart_time: number = 3000
//         private check_time: number = 3000
//         private lock_time: number = 4000
//         public ws: WebSocket | undefined
//         private h_timer: number | undefined
//         private c_timer: number | undefined
//         private l_timer: number | undefined
//         private isLock: boolean = false
//         private token: string | undefined


//         public init(options: Ioptions = {}): void {

//             const { token, heart_time, check_time, lock_time } = options

//             if (token) {
//                 this.token = token
//             }

//             if (heart_time) {
//                 this.heart_time = heart_time
//             }

//             if (check_time) {
//                 this.check_time = check_time
//             }

//             if (lock_time) {
//                 this.lock_time = lock_time
//             }

//             if (this.url == '') {
//                 throw new Error('socket链接地址不能为空')
//             }

//             this.wsInit()
//         }

//         private getUrl(): string {
//             if (this.token !== undefined) {
//                 return `${this.url}?token=${this.token}`
//             } else {
//                 return `${this.url}`
//             }
//         }

//         public wsInit(): void {
//             const ws = new WebSocket(this.getUrl())
//             ws.onopen = () => {
//                 this.heartCheck()
//             }

//             ws.onclose = () => {
//                 this.reconnect()
//             }

//             ws.onerror = () => {
//                 this.reconnect()
//             }

//             ws.onmessage = (e) => {
//                 this.heartCheck()
//                 this.callback(e)
//             }

//             this.ws = ws
//         }

//         private heartCheck(): void {
//             this.h_timer && clearTimeout(this.h_timer)
//             this.c_timer && clearTimeout(this.c_timer)
//             this.h_timer = setTimeout(() => {
//                 (this.ws as WebSocket).send('type:ping')
//                 this.c_timer = setTimeout(() => {
//                     if ((this.ws as WebSocket).readyState !== 1) {
//                         (this.ws as WebSocket).close()
//                     }
//                 }, this.check_time)
//             }, this.heart_time)
//         }

//         // 重连
//         private reconnect(): void {
//             if (this.isLock) {
//                 return
//             }

//             this.isLock = true
//             this.l_timer && clearTimeout(this.l_timer)
//             this.l_timer = setTimeout(() => {
//                 this.wsInit()
//                 this.isLock = false
//             }, this.lock_time)
//         }
//     }

//     return new Ws
// }

// export {
//     createSocket
// }

/**
 * WebSocket 封装类
 * 功能：自动重连、心跳机制、状态管理、消息回调
 */
const SOCKET_STATUS = {
    CONNECTING: "connecting", // 正在连接
    CONNECTED: "connected", // 已连接
    DISCONNECTED: "disconnected", // 已断开
    RECONNECTING: "reconnecting", // 正在重连
    CLOSED: "closed", // 已手动关闭
};

export class CustomSocket {
    /**
     * 构造函数
     * @param {string} url - WebSocket 服务器地址
     * @param {Object} options - 配置项
   // ===== 配置项 =====
     * @param {number} [options.heartbeatInterval=10000] - 心跳发送间隔（毫秒）
     * @param {number} [options.reconnectDelay=5000] - 重连延迟时间（毫秒）
     * @param {string} [options.pingMessage='ping'] - 发送心跳消息内容
     * @param {string} [options.pongMessage='pong'] - 响应心跳消息内容
     * @param {Function} [options.onMessage] - 接收到非心跳消息时的回调
     * @param {Function} [options.onOpen] - 连接成功时的回调
     * @param {Function} [options.onError] - 连接错误时的回调
     * @param {Function} [options.onClose] - 连接关闭时的回调
     * @param {Function} [options.onReconnect] - 尝试重连时的回调
     * @param {Function} [options.onStatusChange] - 任意状态变更时的回调（如 connected, disconnected, reconnecting, closed, connecting）
     * @param {Function} [options.onConnecting] - 启动连接前的回调（包括首次连接 & 重连）
     * @param {boolean} [options.debug=false] - 是否打印调试日志
     * @param {number} [options.maxReconnectAttempts=Infinity] - 最大重连次数，默认无限
     */
    constructor(url, options = {}) {
        this.url = url; // WebSocket 地址
        this.socket = null; // WebSocket 实例

        // 默认配置项
        this.heartbeatInterval = options.heartbeatInterval || 10000; // 心跳间隔时间，默认 10 秒
        this.reconnectDelay = options.reconnectDelay || 5000; // 重连等待时间，默认 5 秒
        this.pingMessage = options.pingMessage || "ping"; // 发送心跳消息内容
        this.pongMessage = options.pongMessage || "pong"; // 响应心跳消息内容
        this.debug = options.debug || false; // 是否启用调试日志
        this.maxReconnectAttempts = options.maxReconnectAttempts || Infinity; // 最大重连次数

        // ===== 回调函数（支持注入）=====
        const noop = () => { };
        this.onMessage = options.onMessage || noop; // 消息接收回调
        this.onOpen = options.onOpen || noop; // 连接开启回调
        this.onError = options.onError || noop; // 连接错误回调
        this.onClose = options.onClose || noop; // 连接关闭回调
        this.onReconnect = options.onReconnect || noop; // 重连时回调
        this.onStatusChange = options.onStatusChange || noop; // 状态变更统一回调
        this.onConnecting = options.onConnecting || noop; // 连接开始回调

        // 状态字段
        this.isConnected = false; // 当前是否连接成功
        this.isReconnecting = false; // 当前是否正在重连
        this.manualClose = false; // 当前是手动关闭
        this.reconnectAttempts = 0; // 当前重连尝试次数
        this.lastPongTime = null; // 上一次收到 pong 的时间戳

        // 定时器句柄
        this.heartbeatTimer = null; // 心跳定时器
        this.reconnectTimer = null; // 重连定时器

        // 初始化连接
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
        this.socket = new WebSocket(this.url);

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
            if (msg.data === this.pongMessage) {
                this.lastPongTime = Date.now(); // 记录收到心跳回应时间
                return; // 不传给业务逻辑
            }
            this.onMessage(msg); // 非心跳业务消息，转发给用户
        };

        // 连接出错
        this.socket.onerror = (err) => {
            this.debug && console.error("WebSocket error:", err);
            this.onError(err);
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
            if (this.socket.readyState === WebSocket.OPEN) {
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
    send(data) {
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
