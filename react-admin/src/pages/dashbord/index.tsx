import * as React from 'react'
import Card from './card'
import MiddlePieBox from './MiddlePieBox'
import './index.scss'
import MiddleBarBox from './MiddleBarBox'
import BottomBarBox from './BottomBarBox.tsx'
import BottomBarRightBox from './BottomBarRightBox.tsx'
import BottomMiddleBox from './BottomMiddleBox.tsx'
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

  // return <ReactECharts option={options} />
  return (
    <div className="Dashboard">
      <Card title="总数" />
      <Card title="入住数" />
      <Card title="空置数" />
      <Card title="排队数" />
      <div className="col2-3">
        <MiddlePieBox />
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