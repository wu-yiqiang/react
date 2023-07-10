declare module 'react-router-dom'
declare module '@*'
declare module 'components*'
declare module 'axios'

interface Window {
  $cancelRequest: Function;
}
interface Date { // 给Date添加方法
  Format(params: any): void;
}

interface SportList {
  sportId: number
  src: string
  introduce: string
}

interface TargetList {
  title: string
  time: number
  remainder: number
  total: number
  color: string
  state: string
}

interface BannerList {
  src: string
  introduce: string
}