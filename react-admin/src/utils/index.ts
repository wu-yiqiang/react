export const isDark = (theme: string) => {
  const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)')?.matches
  return theme == 'system' && isDarkTheme ? true : theme == 'system' && !isDarkTheme ? false : theme == 'dark' ? true : false
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

// 数组差集
export const diff = (arr1: Array<number | string>, arr2: Array<number | string>) => Array.from(new Set(union(arr1, arr2).filter((item) => !cross(arr1, arr2).includes(item))))

// 数组并集
export const union = (arr1: Array<string | number>, arr2: Array<string | number >): Array<string | number> => Array.from(new Set([...arr1, ...arr2]))
// 数组交集
export const cross = (arr1: Array<number | string>, arr2: Array<number | string>) => Array.from(new Set(arr1.filter((item) => arr2.includes(item))))


// function checkWeakNetwork() {
//   const connection = navigator?.connection || navigator?.mozConnection || navigator?.webkitConnection;
//   if (connection) {
//     if (connection.effectiveType === '2g' || connection.saveData) {
//       // 当为2G网络的时候可以判定为弱网环境
//       console.log("Weak network detected");
//       return
//     }
//     if (connection.rtt && connection.rtt > 300) {
//       // 当RTT数值大于300ms时可以判定为弱网环境
//       console.log(`RTT: ${connection.rtt} ms`);
//       return
//     }
//     if (connection.downlink && connection.downlink < 1) {
//       // 当下载速度小于1Mb/s的时候可以判断为弱网环境
//       console.log(`Downlink: ${connection.downlink} Mb/s`);
//       return
//     }
//     // 监听网络变化
//     connection.addEventListener('change', () => {
//       console.log(`New connection type: ${connection.effectiveType}`);
//     });
//   } else {
//     // 系统不支持navigation API的时候，通过发送请求查看延迟时间判断弱网环境
//     const startTime = new Date().getTime();
//     fetch("https://majnoon.fieldsone.com", {
//       method: "GET",
//       // credentials: 'same-origin', // include, *same-origin, omit
//       // redirect: 'follow', // manual, *follow, error
//       // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       // headers: {
//       //   "Access-Control-Allow-Origin": "*",
//       //   "Access-Control-Allow-Credentials" : true,
//       // },
//       cache: "no-store",
//       mode: 'no-cors' // no-cors, *cors, same-origin
//     })
//       .then(() => {
//         const latency = new Date().getTime() - startTime;
//         console.log(`Latency: ${latency} ms`);
//         if (latency > 300) {
//           console.log("Weak network detected");
//         }
//       })
//       .catch(() => {
//         console.log("Network request failed");
//       });
//   }

// }

// function showPosition(position) {
//   console.log("完整位置信息:", position); // 可以在开发者工具控制台查看所有信息

//   // 从位置对象中提取纬度和经度
//   var latitude = position.coords.latitude;  // 纬度
//   var longitude = position.coords.longitude; // 经度

//   console.log('纬度: ' + latitude + ', 经度: ' + longitude);

//   // 通常，我们会在这里做点事情，比如显示在地图上，或者调用下一步的地址转换
//   // 例如: convertToAddress(latitude, longitude);
// }
// function showError(error) {
//   console.warn("定位错误 (CODE: " + error.code + "):", error.message);
//   switch (error.code) {
//     case error.PERMISSION_DENIED:
//       alert("定位失败：您拒绝了位置共享请求。请检查浏览器设置或页面权限。");
//       break;
//     case error.POSITION_UNAVAILABLE:
//       alert("定位失败：暂时无法获取您的位置信息。可能是网络问题或定位服务（如手机GPS）未开启。");
//       break;
//     case error.TIMEOUT:
//       alert("定位失败：获取位置信息超时。请确保网络畅通并重试。");
//       break;
//     case error.UNKNOWN_ERROR:
//       alert("定位失败：发生未知错误。请稍后再试。");
//       break;
//   }
// }
// function getLocation() {
//   if (navigator.geolocation) {
//     // 浏览器支持，可以尝试获取位置
//     navigator.geolocation.getCurrentPosition(showPosition, showError);
//   } else {
//     // 浏览器太老，不支持
//     alert("很抱歉，您的浏览器不支持地理定位功能。请考虑升级浏览器。");
//   }
// }
// https://mp.weixin.qq.com/s/hYg7baKEaYSjOJ2X2mwAVw

export const formattedAmountCNY = (amount: number) => {
  if (!amount) return '0.00'
  return new Intl.NumberFormat('zh-CN', {
    currency: 'CNY',
    useGrouping: false,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100)
}

export const formattedAmountCent = (yuanAmount: number): number => {
  let amountStr = String(yuanAmount)?.trim();
  const [integer, decimal = ''] = amountStr?.split('.');
  const decimalPadded = decimal.padEnd(2, '0');
  const totalCents = integer + decimalPadded;
  const cents = parseInt(totalCents, 10);
  if (isNaN(cents)) {
    throw new Error('无效金额');
  }
  return cents;
}