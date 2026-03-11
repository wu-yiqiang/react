import * as React from 'react'
import Card from './card.tsx'
import MiddlePieBox from './MiddlePieBox.tsx'
import './index.scss'
import MiddleBarBox from './MiddleBarBox.tsx'
import BottomBarBox from './BottomBarBox.tsx'
import BottomBarRightBox from './BottomBarRightBox.tsx'
import BottomMiddleBox from './BottomMiddleBox.tsx'
import MiddleLeftPieBox from './MiddleLeftPieBox.tsx'
const Dashbord: React.FC = () => {
  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ],
    tooltip: {
      trigger: 'axis'
    }
  }
  return (
    <div className="Dashboard">
      <Card title="出货量" name="data" count={12334} />
      <Card title="成交量" name="empty" count={3734} />
      <Card title="退货量" name="warn" count={1434} />
      <Card title="库存量" name="notice" count={734} />
      <div className="col2-3">
        <MiddleLeftPieBox />
      </div>
      <div className="col2-3">
        <MiddlePieBox />
      </div>
      <div className="row3-5">
        <MiddleBarBox />
      </div>
      <div className="col4-5">
        <BottomBarBox />
      </div>
      <div className="row3-4">
        <BottomMiddleBox />
      </div>
      <div className="col4-5">
        <BottomBarRightBox />
      </div>
    </div>
  )
}

export default Dashbord