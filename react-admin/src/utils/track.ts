//// import {cross} from '@venturan/ts-tools'
//
//interface Record {
//  type: string,
//  url: string,
//  user: string,
//  role: string,
//  opeartionName: string
//}
//
//class Track {
//  mdList: Array<object>
//  pageFrom
//  pageCurrent
//  clickTargetElement
//  constructor(targets: Array<string>) {
//    this.pageFrom = {}
//    this.pageCurrent = {}
//    this.mdList = []
//    this.clickTargetElement = targets
//    this.addListenner()
//  }
//
//  // 添加全局的埋点监听
//  addListenner() {
//    this.addViewListener()
//    this.addClickListener()
//  }
//
//  // 监听页面的路由更改
//  addViewListener() {
//    const handleViewMD = () => {
//      const data = {
//        type: 'view',
//        page: {
//          from: this.pageFrom,
//          current: this.pageCurrent
//        },
//        data: null
//      }
//      this.recordMD(data)
//    }
//    // 记录路由数据
//    // router.beforeEach((to, from, next) => {
//    //   this.pageFrom = from
//    //   this.pageCurrent = to
//    //   handleViewMD()
//    //   next()
//    // })
//
//    // // 推送已存在的埋点数据
//    // router.afterEach(() => {
//    //   this.mdList.length && this.pushOrigin()
//    // })
//  }
//
//  addClickListener() {
//    document.onclick = (e) => {
//      const target = e?.target
//      const offsetParent = target?.offsetParent
//      if (offsetParent) {
//        const classNameLists = offsetParent.className.split(' ')
////        if (cross(classNameLists, this.clickTargetElement)?.length) {
////          const template = {
////            type: 'click',
////            url: '/xxxx/sdsd',
////            user: 'sutter',
////            ua: 'sd'
////          }
////          console.log('offsetParent', offsetParent?.innerText)
////          this.handleRecord(template)
////        }
//      }
//    }
//  }
//  handleRecord(data: object) {
//    this.mdList.push(data)
//  }
//  handlePushOrigin() {
//    console.warn(this.mdList)
//    console.log('%c推送埋点数据....', 'color: red;')
//    this.mdList = []
//  }
//}
//
//export default Track
