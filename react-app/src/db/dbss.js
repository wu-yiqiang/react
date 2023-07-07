/**
 * 打开数据库
 * @param {object} dbName 数据库的名字
 * @param {string} storeName 仓库名称
 * @param {string} version 数据库的版本
 * @return {object} 该函数会返回一个数据库实例
 */
let dbInstance = null
export function openDB(dbName, version = 1) {
  if (dbInstance) return dbInstance
  dbInstance = new Promise((resolve, reject) => {
    //  兼容浏览器
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    let db
    // 打开数据库，若没有则会创建
    const request = indexedDB.open(dbName, version)
    // 数据库打开成功回调
    request.onsuccess = function (event) {
      db = event.target.result // 数据库对象
      console.log('数据库打开成功')
      resolve(db)
    }
    // 数据库打开失败的回调
    request.onerror = function (event) {
      console.log('数据库打开报错')
    }
    // 数据库有更新时候的回调
    request.onupgradeneeded = function (event) {
      // 数据库创建或升级的时候会触发
      db = event.target.result // 数据库对象
      var objectStore
      // 创建存储库
      objectStore = db.createObjectStore('target', {
        keyPath: 'targetId', // 这是主键
        autoIncrement: true // 实现自增
      })
      // 创建索引，在后面查询数据的时候可以根据索引查
      objectStore.createIndex('title', 'title', { unique: false })
      objectStore.createIndex('time', 'time', { unique: false })
      objectStore.createIndex('remainder', 'remainder', { unique: false })
      objectStore.createIndex('total', 'total', { unique: false })
    }
  })
  return dbInstance
}
/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} data 数据
 */
export function addData(db, storeName, data) {
  var request = db
    .transaction([storeName], 'readwrite') // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
    .objectStore(storeName) // 仓库对象
    .add(data)

  request.onsuccess = function (event) {
    console.log('数据写入成功')
  }

  request.onerror = function (event) {
    console.log('数据写入失败')
  }
}
/**
 * 通过主键读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} key 主键值
 */
export function getDataByKey(db, storeName, key) {
  return new Promise((resolve, reject) => {
    var transaction = db.transaction([storeName]) // 事务
    var objectStore = transaction.objectStore(storeName) // 仓库对象
    var request = objectStore.get(key) // 通过主键获取数据

    request.onerror = function (event) {
      console.log('事务失败')
    }

    request.onsuccess = function (event) {
      console.log('主键查询结果: ', request.result)
      resolve(request.result)
    }
  })
}
/**
 * 通过游标读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 */
export function cursorGetData(db, storeName) {
  let list = []
  var store = db
    .transaction(storeName, 'readwrite') // 事务
    .objectStore(storeName) // 仓库对象
  var request = store.openCursor() // 指针对象
  // 游标开启成功，逐行读数据
  request.onsuccess = function (e) {
    var cursor = e.target.result
    // console.log('kkk', cursor)
    if (cursor) {
      // 必须要检查
      list.push(cursor.value)
      cursor.continue() // 遍历了存储对象中的所有内容
    } else {
      console.log('游标读取的数据：', list)
    }
  }
  return list
}

/**
 * 通过索引读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 */
export function getDataByIndex(db, storeName, indexName, indexValue) {
  var store = db.transaction(storeName, 'readwrite').objectStore(storeName)
  var request = store.index(indexName).get(indexValue)
  request.onerror = function () {
    console.log('事务失败')
  }
  request.onsuccess = function (e) {
    var result = e.target.result
    console.log('索引查询结果：', result)
  }
}

/**
 * 通过索引和游标查询记录
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 */
export function cursorGetDataByIndex(db, storeName, indexName, indexValue) {
  let list = []
  var store = db.transaction(storeName, 'readwrite').objectStore(storeName) // 仓库对象
  var request = store
    .index(indexName) // 索引对象
    .openCursor(IDBKeyRange.only(indexValue)) // 指针对象
  request.onsuccess = function (e) {
    var cursor = e.target.result
    if (cursor) {
      // 必须要检查
      list.push(cursor.value)
      cursor.continue() // 遍历了存储对象中的所有内容
    } else {
      console.log('游标索引查询结果：', list)
    }
  }
  request.onerror = function (e) {}
}

/**
 * 通过索引和游标分页查询记录
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 * @param {number} page 页码
 * @param {number} pageSize 查询条数
 */
export function cursorGetDataByIndexAndPage(db, storeName, indexName, indexValue, page, pageSize) {
  let list = []
  let counter = 0 // 计数器
  let advanced = true // 是否跳过多少条查询
  var store = db.transaction(storeName, 'readwrite').objectStore(storeName) // 仓库对象
  var request = store
    .index(indexName) // 索引对象
    .openCursor(IDBKeyRange.only(indexValue)) // 指针对象
  request.onsuccess = function (e) {
    var cursor = e.target.result
    if (page > 1 && advanced) {
      advanced = false
      cursor.advance((page - 1) * pageSize) // 跳过多少条
      return
    }
    if (cursor) {
      // 必须要检查
      list.push(cursor.value)
      counter++
      if (counter < pageSize) {
        cursor.continue() // 遍历了存储对象中的所有内容
      } else {
        cursor = null
        console.log('分页查询结果', list)
      }
    } else {
      console.log('分页查询结果', list)
    }
  }
  request.onerror = function (e) {}
}

/**
 * 更新数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} data 数据
 */
export function updateDB(db, storeName, data) {
  var request = db
    .transaction([storeName], 'readwrite') // 事务对象
    .objectStore(storeName) // 仓库对象
    .put(data)

  request.onsuccess = function () {
    console.log('数据更新成功')
  }

  request.onerror = function () {
    console.log('数据更新失败')
  }
}

/**
 * 通过主键删除数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} id 主键值
 */
export function deleteDB(db, storeName, id) {
  var request = db.transaction([storeName], 'readwrite').objectStore(storeName).delete(id)

  request.onsuccess = function () {
    console.log('数据删除成功')
  }

  request.onerror = function () {
    console.log('数据删除失败')
  }
}

/**
 * 通过索引和游标删除指定的数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名
 * @param {object} indexValue 索引值
 */
export function cursorDelete(db, storeName, indexName, indexValue) {
  var store = db.transaction(storeName, 'readwrite').objectStore(storeName)
  var request = store
    .index(indexName) // 索引对象
    .openCursor(IDBKeyRange.only(indexValue)) // 指针对象
  request.onsuccess = function (e) {
    var cursor = e.target.result
    var deleteRequest
    if (cursor) {
      deleteRequest = cursor.delete() // 请求删除当前项
      deleteRequest.onerror = function () {
        console.log('游标删除该记录失败')
      }
      deleteRequest.onsuccess = function () {
        console.log('游标删除该记录成功')
      }
      cursor.continue()
    }
  }
  request.onerror = function (e) {}
}

/**
 * 删除数据库
 * @param {object} dbName 数据库名称
 */
export function deleteDBAll(dbName) {
  console.log(dbName)
  let deleteRequest = window.indexedDB.deleteDatabase(dbName)
  deleteRequest.onerror = function (event) {
    console.log('删除失败')
  }
  deleteRequest.onsuccess = function (event) {
    console.log('删除成功')
  }
}

/**
 * 关闭数据库
 * @param {object} db 数据库实例
 */
export function closeDB(db) {
  db.close()
  console.log('数据库已关闭')
}



// 初始化数据
const dbName = 'reactApp'
const createRandomChinese = (count) => {
  const start = parseInt('4e00', 16)
  const end = parseInt('9fa5', 16)
  let name = ''
  for (let i = 0; i < count; i++) {
    const cha = Math.floor(Math.random() * (end - start))
    name += '\\u' + (start + cha).toString(16)
  }
  return eval(`'${name}'`)
}
export async function initDb() {
  deleteDBAll(dbName)
  const db = await openDB(dbName, 1)
  // 添加target数据
  let count = 20
  while (count >= 0) {
    const item = { remainder: Math.floor(Math.random() * 100 + 1), title: createRandomChinese(Math.random() * 6 + 1), time: new Date().getTime(), total: Math.floor(Math.random() * 100 + 1) }
    addData(db, 'target', item), count--
  }
}
