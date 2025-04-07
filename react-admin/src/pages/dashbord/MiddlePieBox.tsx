import * as React from 'react'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import './MiddlePieBox.scss'
const MiddlePieBox: React.FC = () => {
   var datavaule = [10, 50, 54, 45, 84]
   const indicator = [
     { name: '清洁', max: 100 },
     { name: '维护', max: 100 },
     { name: '寿命', max: 100 },
     { name: '评价', max: 100 },
     { name: '考核', max: 100 }
   ]

  const options = {
     title: {
       text: '83.7',
       top: 'center',
       left: 'center',
       textStyle: {
         fontSize: 18
       }
     },
     tooltip: {
       show: true,
       trigger: 'item'
     },
     radar: {
       center: ['50%', '50%'],
       radius: '65%',
       indicator: indicator,
       splitNumber: 6,
       splitArea: {
         areaStyle: {
           color: ['rgba(212, 242, 253, 1)', 'rgba(199, 239, 252, 1)'].reverse()
         }
       },
       axisLabel: {
         show: false
       },
       axisLine: {
         lineStyle: {
           color: 'rgba(159, 223, 253, 1)',
           width: 1
         }
       },
       splitLine: {
         lineStyle: {
           color: 'rgba(76, 189, 255, 1)', // 分隔线颜色
           width: 1 // 分隔线线宽
         }
       },
       name: {
         textStyle: {
           color: '#f9f9f9',
           fontSize: 20,
           padding: [0, 0, 0, 0]
         }
       }
     },

     series: [
       {
         type: 'radar',
         symbol: 'none',
         name: '五维雷达',
         lineStyle: {
           normal: {
             color: 'rgba(87, 145, 207, 1)'
           }
         },
         areaStyle: {
           normal: {
             // 单项区域填充样式
             color: new echarts.graphic.LinearGradient(
               0,
               0,
               0,
               1,
               [
                 {
                   offset: 0,
                   color: 'rgba(76, 189, 255, 0.2)'
                 },
                 {
                   offset: 1,
                   color: 'rgba(76, 189, 255, 1)'
                 }
               ],
               false
             ),
             // 设置扇形的阴影
             shadowBlur: 12,
             shadowColor: 'rgba(76, 189, 255, 0.6)',
             shadowOffsetX: 6,
             shadowOffsetY: 6
           }
         },
         data: [datavaule]
       }
     ]
   }
  return (
    <div className="MiddlePieBox">
      <ReactECharts option={options} />
    </div>
  )
}

export default MiddlePieBox