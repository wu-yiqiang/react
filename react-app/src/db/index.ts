import { db } from './db'
// Sports表
async function initSports() {
  await db.sports.clear()
  const lists = [
    { sportId: 1, src: 'https://img1.imgtp.com/2023/07/05/7tfGlTFT.gif', introduce: '跑步在运动上的定义是一种步伐，双脚不会同一时间踫到地面。它亦可以是一种有氧的运动或厌氧的运动。跑步锻炼是人们最常采用的一种身体锻炼方式。' },
    { sportId: 2, src: 'https://img1.imgtp.com/2023/07/05/vfYsoVLK.gif', introduce: '瑜伽是一门现实哲学，而不是宗教信仰，不需要练习者对某个特定的信念理论体系忠贞不贰。' },
    { sportId: 3, src: 'https://img1.imgtp.com/2023/07/05/plrP4qDB.gif', introduce: '哑铃是一种用于增强肌肉力量训练的简单器材。它的主要材料是铸铁，有的外包一层橡胶。' },
    { sportId: 4, src: 'https://img1.imgtp.com/2023/07/05/QWaMvWu2.gif', introduce: '跳绳是一种有效的有氧运动，是一种有效的减肥和减脂的运动；能够增强身体素质，促进血液循环，跳绳有利呼吸系统的强化和循环系统的强化，增加锻炼者的肺活量，有效的改善心脏供血功能；可以很好的增强手眼协调功能，锻炼我们身体的协调性和灵敏度；能够加强机体的代谢功能，强化血管的功能，因此对于疾病也有很好的预防作用；跳绳属于一种全身性的运动，能够对上下肢、腰部和臀部，有一定协调效果和锻炼目的。总之来说，只要方式方法正确，百利而无一害。' },
    { sportId: 5, src: 'https://img1.imgtp.com/2023/07/05/2yCmTbSx.gif', introduce: '游泳，是人在水的浮力作用下产生向上漂浮，凭借浮力通过肢体进行规律运动的技能。游泳运动分为实用游泳、竞技游泳和花样游泳。等级为：三级、二级、一级、健将、国际健将。游泳是一种能增强心肺功能，预防多种疾病，提高免疫力，释放压力的运动方式。' },
    { sportId: 6, src: 'https://img1.imgtp.com/2023/07/05/mHR8O2HZ.gif', introduce: '太极拳是基于阴阳循环、天人合一的中国传统哲学思想和养生观念，以中正圆活为运动特征的传统体育实践。该遗产项目注重意念修炼与呼吸调整，以五步、八法为核心动作，以套路、功法、推手为运动形式。太极拳习练者通过对动静、快慢、虚实的把控，达到修身养性、强身健体的目的。' },
    { sportId: 7, src: 'https://img1.imgtp.com/2023/07/05/Fu8g73ff.gif', introduce: '足球是一项以脚为主，控制和支配球，两支球队按照一定规则在同一块长方形球场上互相进行进攻、防守对抗的体育运动项目。因足球运动对抗性强、战术多变、参与人数多等特点，故被称为“世界第一运动”。' },
    { sportId: 8, src: 'https://img1.imgtp.com/2023/07/05/JmG5YGGu.gif', introduce: '排球是球类运动项目之一，球场长方形，中间隔有高网，比赛双方（每方六人）各占球场的一方，球员用手把球从网上空打来打去。排球运动使用的球，用羊皮或人造革做壳，橡胶做胆，大小和足球相似。' },
    { sportId: 9, src: 'https://img1.imgtp.com/2023/07/05/4SDYfLy6.gif', introduce: '网球是球类运动项目之一。有效网球运动场地是一个长方形，长为23.77米，单打场地宽为8.23米，双打场地宽为10.97米。中间隔有网，比赛双方各占球场的一方，球员用网球拍击球。' },
    { sportId: 10, src: 'https://img1.imgtp.com/2023/07/05/4mD9Xdop.gif', introduce: '滑雪运动是运动员把滑雪板装在靴底上在雪地上进行速度、跳跃和滑降的竞赛运动。滑雪板用木材、金属材料和塑料混合制成。高山滑雪由滑降，小回转和大回转（障碍滑雪）组成。高山滑雪混合项目，由上述三个项目组成。人们成站立姿态，手持滑雪杖、足踏滑雪板在雪面上滑行的运动。“立”、“板”、“雪”、“滑”是滑雪运动的关键要素。' },
    { sportId: 11, src: 'https://img1.imgtp.com/2023/07/05/K1VJQ0ef.gif', introduce: '羽毛球是一项隔着球网，使用长柄网状球拍击打用羽毛和软木制作而成的一种小型球类的室内运动项目。羽毛球比赛在长方形的场地上进行，场地中间有网相隔，双方运用各种发球、击球和移动等技战术，将球在网上往返对击，以不使球落在本方有效区域内，或使对方击球失误为胜。' },
    { sportId: 12, src: 'https://img1.imgtp.com/2023/07/05/u7g6FDSC.gif', introduce: '棒球运动是一种以棒打球为主要特点，集体性、对抗性很强的球类运动项目。它在国际上开展较为广泛，影响较大，被誉为“竞技与智慧的结合”。在美国、日本尤为盛行，被称为“国球”。其也是一种团体球类运动，法定比赛人数最少为9人。' }
  ]
  lists.forEach(async (v) => {
    const item: SportList = { sportId: v.sportId, src: v.src, introduce: v.introduce }
    await db.sports.add(item)
  })
}
// Banners表
async function initBanners() {
  // banner
  await db.banners.clear()
  const bannerLists = [
    { src: 'https://img1.imgtp.com/2023/07/07/N624u0Dc.jpeg', introduce: 'banner1' },
    { src: 'https://img1.imgtp.com/2023/07/07/9KbObfSH.jpeg', introduce: 'banner2' },
    { src: 'https://img1.imgtp.com/2023/07/07/IBqjEXSq.jpeg', introduce: 'banner3' },
    { src: 'https://img1.imgtp.com/2023/07/07/SrjlcrqU.jpeg', introduce: 'banner4' },
    { src: 'https://img1.imgtp.com/2023/07/07/vp9NT6LT.jpeg', introduce: 'banner5' }
  ]
  bannerLists.forEach(async (v) => {
    const banner: BannerList = { src: v.src, introduce: v.introduce }
    await db.banners.add(banner)
  })
}

// Targets表
async function initTargets() {
  await db.targets.clear()
  const targetLists = [
    { title: '网球', total: 12, remainder: 4, color: '#748bf0', time: 1688801966971, state: '进行中' },
    { title: '游泳', total: 22, remainder: 11, color: '#445bc7', time: 1685501966971, state: '进行中' },
    { title: '瑜伽', total: 32, remainder: 21, color: '#d2ee82', time: 1684401966971, state: '进行中' },
    { title: '棒球', total: 42, remainder: 35, color: '#e3b270', time: 1681101966971, state: '进行中' },
    { title: '哑铃', total: 10, remainder: 2, color: '#67f2d1', time: 1681149966971, state: '已完成' },
    { title: '排球', total: 5, remainder: 1, color: '#BBDEFB', time: 1681329966971, state: '已完成' },
    { title: '羽毛球', total: 50, remainder: 41, color: '#03A9F4', time: 1681129934971, state: '已完成' },
    { title: '足球', total: 25, remainder: 10, color: '#78f9f6', time: 1681429990971, state: '已完成' },
    { title: '太极', total: 65, remainder: 10, color: '#B2DFDB', time: 1681123466971, state: '已完成' },
    { title: '跑步', total: 63, remainder: 33, color: '#9169f9', time: 1681028986971, state: '未完成' },
    { title: '橄榄球', total: 35, remainder: 0, color: '#ddaa23', time: 1680001966971, state: '未完成' },
    { title: '攀岩', total: 5, remainder: 0, color: '#F79F1F', time: 1680731966971, state: '未完成' },
    { title: '踢毽子', total: 15, remainder: 0, color: '#FDA7DF', time: 1682201966971, state: '未完成' }
  ]
  targetLists.forEach(async (v) => {
    const target: TargetList = { title: v.title, total: v.total, remainder: v.remainder, color: v.color, time: v.time, state: v.state }
    await db.targets.add(target)
  })
}
export default async function initDb() {
  initTargets()
  initBanners()
  initSports()
}
