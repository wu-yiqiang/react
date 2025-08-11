import { LanguageCode } from '@/enums/language'
import { toPng } from 'html-to-image'

// 获取列表数据
export async function getLists(
    getList: (item) => any,
    params: any | null = null,
    callback: (item) => any | null = null,
) {
    const data = await getList(params)
    const values = Array.isArray(data) ? data : data?.content ? data?.content : []
    if (callback) {
        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                const item = values[key]
                callback(item)
            }
        }
    }
    return values
}

export function getNodePath(tree, targetId) {
    const path = []
    function traverse(node, id) {
        if (node && Array.isArray(node)) {
            for (let i = 0; i < node.length; i++) {
                const currentId = node[i].title
                if (currentId === id) {
                    path.unshift(node[i]?.title)
                    return true
                }
                if (node[i]?.children?.length && traverse(node[i].children, id)) {
                    path.unshift(node[i]?.title)
                    return true
                }
            }
        }
        else if (node && node.title === id) {
            path.unshift(node.title)
            return path
        }
        return false
    }
    traverse(tree, targetId)
    return path
}

export function getNode(tree, targetId, key = 'title') {
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node && node[key] === targetId)
            return node
        if (node?.children && node?.children?.length) {
            const data = getNode(node?.children, targetId, key)
            if (data)
                return data
        }
    }
}

// 超出字符个数显示省略号
export function omitCharacters(strs: string, num = 16) {
    if (!strs)
        return strs
    if (strs.length <= num)
        return strs
    const str = `${strs.substr(0, num)}...`
    return str
}

// 随机整数
export function randomInt(n = 99999999999) {
    return Math.floor(Math.random() * n) + 1
}

// 清空对象空值的属性
export function clearNull(obj) {
    const newObj = Object.keys(obj)
        .filter(k => ![null, '', undefined].includes(obj[k]))
        .reduce((a, k) => ({ ...a, [k]: obj[k] }), {})
    return newObj
}

export function scrollToTop(selector: string) {
    const element = document.querySelector(selector)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        element.scrollTo(0, 0)
    }
}

export function formatNumber(number: number, amount = false) {
    return number?.toLocaleString(
        'en-US',
        amount
            ? {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
            : {},
    )
}

export function toLocaleUpperCase(str: string) {
    return str?.toLocaleUpperCase() || ''
}

export function listToTree(list: any[], key = 'parentId', cd?: (item) => any) {
    const recursion = (list: any[], parentId: any) => {
        if (!parentId)
            return []
        const arr = list
            .filter(item => item[key] === parentId)
            .map(item => ({
                ...item,
                activeFlag: +item.activeFlag,

                ...(cd?.(item) || {}),
                children: recursion(list, item.id),
            }))
        return arr.length ? arr : null
    }
    return list
        .filter(a => !a[key])
        .map((_) => {
            return {
                ..._,
                activeFlag: +_.activeFlag,
                ...(cd?.(_) || {}),
                children: recursion(list, _.id),
            }
        })
}

export function findNodeById(
    tree: Array<any>,
    key: number | string,
    keyId = 'id',
    isToLocaleUpperCase = false,
) {
    for (const node of tree) {
        if (!isToLocaleUpperCase && node[keyId] === key) {
            return node
        }

        if (
            isToLocaleUpperCase
            && toLocaleUpperCase(node[keyId]) === toLocaleUpperCase(key as string)
        ) {
            return node
        }
        if (node.children && node.children.length > 0) {
            const foundNode = findNodeById(node.children, key, keyId, isToLocaleUpperCase)
            if (foundNode) {
                return foundNode
            }
        }
    }

    return undefined
}

/**
 * 查找树状数组中的节点并返回其全路径
 * @param tree 树状数组
 * @param targetId 目标节点的 ID
 * @returns 节点的全路径数组
 */
export function getNodeFullPath(tree: any[], targetId: string | number, keyId = 'id'): any[] {
    const path: string[] = []

    const traverse = (node: any, id: string | number): boolean => {
        if (node && Array.isArray(node)) {
            for (let i = 0; i < node.length; i++) {
                const currentId = node[i][id]
                if (currentId === targetId) {
                    path.unshift(node[i])
                    return true
                }
                if (node[i].children && traverse(node[i].children, id)) {
                    path.unshift(node[i])
                    return true
                }
            }
        }
        else if (node && node[id] === targetId) {
            path.unshift(node)
            return true
        }
        return false
    }

    traverse(tree, keyId)
    return path
}

export function formatFileSize(fileSize: number) {
    let temp = ''
    if (fileSize < 1024) {
        return `${fileSize}B`
    }
    else if (fileSize < 1024 * 1024) {
        temp = (fileSize / 1024).toFixed(2)
        return `${temp}KB`
    }
    else if (fileSize < 1024 * 1024 * 1024) {
        temp = (fileSize / (1024 * 1024)).toFixed(2)
        return `${temp}MB`
    }
    else {
        temp = (fileSize / (1024 * 1024 * 1024)).toFixed(2)
        return `${temp}GB`
    }
}

export function formatTimeSize(seconds: number) {
    const d = Number.parseInt((seconds / 60 / 60 / 24).toString()) // 天
    const h = Number.parseInt(((seconds / 60 / 60) % 24).toString()) // 时
    const m = Number.parseInt(((seconds / 60) % 60).toString()) // 分
    const s = Number.parseInt((seconds % 60).toString()) // 秒
    return { d, h, m, s }
}

export function getRandomHexColor() {
    let hex = Math.floor(Math.random() * 16777216).toString(16)
    while (hex.length < 6) {
        hex = `0${hex}`
    }
    return `#${hex}`
}

// 字符串得到末尾.后面的字符串，用于识别文件的后缀名
export function getSubstringAfterLastDot(str: any, symbol: any = '.') {
    // 找到最后一个点的索引
    const lastDotIndex = str?.lastIndexOf(symbol)
    // 如果找到了点，返回点后面的子字符串；否则返回空字符串
    if (lastDotIndex !== -1) {
        const _str = str?.split('?')?.[0] || str
        return _str?.substring(lastDotIndex + 1).toLocaleLowerCase()
    }
    else {
        return '' // 如果没有点，则返回空字符串
    }
}

export async function downBlobFileByPath({
    path,
    fileName,
    blob,
    src,
}: {
    path?: string
    fileName: string
    blob?: Blob
    src?: string
}) {
    let _blob = blob
    if (path) {
        const response = await fetch(path)
        _blob = await response.blob()
    }
    const url = _blob && window.URL.createObjectURL(_blob)
    const link = document.createElement('a')
    link.href = url || src
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(link)
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getElementAllChild(selectId, fileName) {
    const container = document.querySelector(selectId)
    if (!container) {
        console.warn(`Element with id "${selectId}" not found`)
        return ''
    }
    const sysStore = useSysStore()

    //  深拷贝原始内容，避免修改真实 DOM
    const cloneContainer = container.cloneNode(true) as HTMLElement

    //  收集 class 和 data-v-xxx 属性（用于匹配 CSS）
    const classList = new Set()
    const dataVList = new Set()
    cloneContainer.querySelectorAll('*').forEach((el) => {
        const classAttr = el.getAttribute('class')
        if (classAttr) {
            classAttr.split(/\s+/).forEach((className) => {
                if (className)
                    classList.add(className)
            })
        }

        Array.from(el.attributes).forEach((attr) => {
            if (attr.name.startsWith('data-v-')) {
                dataVList.add(`[${attr.name}]`)
            }
        })
    })

    // 4️⃣ 提取并处理 CSS 规则
    const styleRules = new Set<string>()
    for (const sheet of document.styleSheets) {
        try {
            const collectRules = (rules: CSSRule[]) => {
                for (const rule of rules) {
                    if (rule instanceof CSSStyleRule) {
                        const selectorText = rule.selectorText
                        const hasMatch
                            = Array.from(classList).some(c => selectorText.includes(`.${c}`))
                            || Array.from(dataVList).some((v: any) => selectorText.includes(v))

                        if (hasMatch) {
                            styleRules.add(pxToPt(rule.cssText))
                        }
                    }
                    else if (rule instanceof CSSGroupingRule) {
                        collectRules(Array.from(rule.cssRules))
                    }
                }
            }
            collectRules(Array.from(sheet.cssRules))
        }
        catch (e) {
            console.warn('无法访问样式表', e)
        }
    }

    //  构建基础样式和最终 HTML
    const baseStyles = `
  @page {
    size: A4 ${sysStore.locale === LanguageCode.AR_AE ? 'landscape' : 'portrait'
        }; /* 或 portrait || landscape*/
    margin: 5mm;
  }
    body { padding: 0px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;width:1080px  }
    .ant-form-item-label, .ant-form-item-control { flex: initial !important; }
    .itf-detail-main-content,.itf-detail-main{padding:0 !important}
    .common-card{border:none !important;box-shadow:none !important;border-radius:none !important;}
    
  `

    const processedBaseStyles = pxToPt(baseStyles)
    const processedStyleRules = Array.from(styleRules)
        .map(rule => pxToPt(rule))
        .join('\n')

    //  返回最终 HTML 字符串
    const html = `<!DOCTYPE html>
    <html dir=${sysStore.locale === LanguageCode.AR_AE ? 'rtl' : 'ltr'} lang=${sysStore.locale === LanguageCode.AR_AE ? 'ar' : 'en'
        }>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
       <title>${fileName}</title>
        <style>
          ${processedBaseStyles}
          ${processedStyleRules}
        </style>
      </head>
      <body>${cloneContainer.innerHTML}</body>
    </html>`

    return html
}

// 将 px 转换为 pt（1px ≈ 0.75pt）
function pxToPt(css: string): string {
    // 仅匹配 font-size 的 px 单位
    return css.replace(/(font-size\s*:\s*)(\d+)px/gi, (match, prop, p1) => {
        const ptValue = Math.round(Number.parseInt(p1)) * 1 // 1px ≈ 0.75pt
        return `${prop}${ptValue}pt`
    })
}
export function getNestedValue(obj: any, path: string): any {
    if (!obj || !path) {
        return null
    }
    // 处理传入路径中的.[0]格式，转换为$0$格式
    const normalizedPath = path.replace(/\.\[(\d+)\]/g, '.$$$1$$')
    const keys: any = normalizedPath.match(/[^.$]+|\$\d+\$/g) || []

    return keys.reduce((acc: any, key: any) => {
        if (acc === undefined || acc === null)
            return undefined

        // 处理数组索引格式（$数字$）
        const match = key.toString().match(/^\$(\d+)\$/)
        const index = match ? Number.parseInt(match[1], 10) : null

        // 如果当前不是对象或数组，返回undefined
        if (typeof acc !== 'object' && !Array.isArray(acc)) {
            return undefined
        }

        // 尝试获取值
        try {
            return acc[index !== null ? index : key]
        }
        catch (e) {
            return undefined
        }
    }, obj)
}

export const handleChecklist = {
    edit: (router, record) => {
        router.push({
            name: "permissionEditChecklist",
            query: { id: record.id },
        });
    },
    copy: (router, record) => {
        router.push({
            name: "permissionAddChecklist",
            query: { id: record.id, copy: "true" },
        });
    }
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


export interface SSEChatParams {
    url: string,
    onmessage: (event: MessageEvent) => void,
    onopen: () => void,
    finallyHandler: () => void,
}


class SSEService {
    private eventSource: EventSource | null = null;

    private finallyHandler: (() => void) | undefined;

    connect(sseChatParams: SSEChatParams) {

        this.finallyHandler = sseChatParams.finallyHandler;

        this.eventSource = new EventSource(sseChatParams.url);

        if (sseChatParams.onopen != null) {
            this.eventSource.onopen = sseChatParams.onopen;
        } else {
            this.eventSource.onopen = () => {
                console.log('SSE 连接已开启');
            };
        }

        if (sseChatParams.onmessage != null) {
            console.log("fuck", sseChatParams.onmessage)
            this.eventSource.onmessage = sseChatParams.onmessage;
        } else {
            this.eventSource.onmessage = (event) => {
                console.log('收到消息：', JSON.parse(event?.data));
            };
        }

        this.eventSource.onerror = (error) => {
            if (this.eventSource?.readyState === EventSource.CLOSED) {
                console.log("SSE 连接已关闭");
            } else {
                console.error("SSE 错误：", error);
            }
            sseChatParams.finallyHandler();
        };
    }

    disconnect() {
        if (this.eventSource) {
            this.eventSource.close();
            if (this.finallyHandler != null) {
                this.finallyHandler();
            }
        }
    }
}

export const sseService = new SSEService();
