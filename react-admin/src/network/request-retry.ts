//
//const resuest = (url, maxCount = 5) => {
//    return fetch(url).catch((err) => maxCount <= 0 ? Promise.reject(err) : resuest(url, maxCount - 1))
//}