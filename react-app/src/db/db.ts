import Dexie, { Table } from 'dexie';

export class MySubClassedDexie extends Dexie {
  targets!: Table<TargetList>
  sports!: Table<SportList>
  banners!: Table<BannerList>

  constructor() {
    super('myDatabase')
    this.version(1).stores({
      targets: '++id, title, time, remainder, total, color, state',
      sports: '++id, sportId,src, introduce',
      banners: '++id, src, introduce'
    })
  }
}

export const db = new MySubClassedDexie();