import Dexie, { Table } from 'dexie';

interface Target {
  id?: number
  title: string
  time: number
  remainder: number
  total: number
}

interface Sport {
  id?: number
  src: string
  introduce: number
}

interface Banner {
  id?: number
  src: string
  introduce: number
}

export class MySubClassedDexie extends Dexie {
  targets!: Table<Target>
  sports!: Table<Sport>
  banners!: Table<Banner>

  constructor() {
    super('myDatabase')
    this.version(1).stores({
      targets: '++id, title, time, remainder, total, color',
      sports: '++id, src, introduce',
      banners: '++id, src, introduce'
    })
  }
}

export const db = new MySubClassedDexie();