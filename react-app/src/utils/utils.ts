import { debounce } from 'lodash-es';
export const sessions = {
  get(key: string) {
    const data = sessionStorage[key]
    if (!data || data === 'null') {
      return null
    }
    return JSON.parse(data).value
  },
  set<T>(key: string, value: T) {
    const data = {
      value
    }
    sessionStorage[key] = JSON.stringify(data)
  },
  // 删除
  remove(key: string) {
    sessionStorage.removeItem(key)
  },
  // 清除全部
  clear() {
    sessionStorage.clear()
  }
}

/**
 * 数据替换 *** 号
 * @val 要替换的数据
 * @head 头部保留，默认3
 * @last 尾部保留，默认4
 */
export const replaceStar = (val: any, head = 3, last = 4) => {
  if (!val) {
    // 字符串为空直接返回
    return val
  }
  if (val.length <= 10) {
    // 少于十位的字符串只显示前三位
    last = 0
  }
  let str = '*'
  let len = val.length - head - last
  str = str.repeat(len) // * 重复len次
  let re = new RegExp('(.{' + head + '}).*(.{' + last + '})', '') // 动态的正则验证
  return val.replace(re, '$1' + str + '$2') // 替换
}

/**
 * 数字三位加逗号
 * @value 数据
 */
export const numberFormat = (value: [number, string]) => {
  if (value !== undefined && value !== null) {
    let str = value.toString()
    let reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
    return str.replace(reg, '$1,')
  } else {
    return ''
  }
}

/**
 * 随机生成十六进制颜色
 * @value 颜色值
 */
export const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0')}`
/**
 * 随机生成最长长度为count的中文
 * @value 中文
 */
export function createRandomChinese(count: number) {
  const start = parseInt('4e00', 16)
  const end = parseInt('9fa5', 16)
  let name = ''
  for (let i = 0; i < count; i++) {
    const cha = Math.floor(Math.random() * (end - start))
    name += '\\u' + (start + cha).toString(16)
  }
  return eval(`'${name}'`)
}

// export function px2Vh(px: string) {
//   if (/%/gi.test(px)) {
//     return px
//   } else {
//     return (parseFloat(px * 100 / 1134) + 'vh')
//   }
// }

export const handleScroll = debounce(function (event: any) {
  const target = event.target.scrollTop
  const height = event.target.offsetHeight
  console.log(target, height)
  if (target % height >= height / 2) {
    event.target.scrollTop = target - (target % height) + height
  } else {
    event.target.scrollTop = target - (target % height)
  }
  return event.target.scrollTop / height
}, 800)
