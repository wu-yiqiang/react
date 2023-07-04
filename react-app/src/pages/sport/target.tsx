import { useState } from 'react'
import { Popup } from 'antd-mobile'
import style from './target.module.less'
import yogaGif from '@/assets/icons/yoga.gif'
function Target(props: any) {
  const { state, closeMask } = props
  return (
    <Popup
      visible={state}
      onMaskClick={() => {
        closeMask()
      }}
      bodyStyle={{ maxHeight: '90vh', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', minHeight: '20vh' }}
    >
      <div className={style.content}>
        <div className={style.banner}>
          <img src={yogaGif} alt="" />
        </div>
        <div className={style.detail}>瑜伽是一门现实哲学，而不是宗教信仰，不需要练习者对某个特定的信念理论体系忠贞不贰。</div>
      </div>
    </Popup>
  )
}

export default Target
