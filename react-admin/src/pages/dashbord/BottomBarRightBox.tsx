import * as React from 'react'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import './BottomBarRightBox.scss'
import first from '@/assets/images/first.png'
import second from '@/assets/images/second.png'
import third from '@/assets/images/third.png'
import frist_dot from '@/assets/images/first_dot.png'
import second_dot from '@/assets/images/second_dot.png'
import third_dot from '@/assets/images/third_dot.png'
import normal_dot from '@/assets/images/normal_dot.png'

const BottomBarBox: React.FC = () => {
 let echartData = [
   {
     value: 44,
     name: '市本级'
   },
   {
     value: 43,
     name: '广陵区'
   },
   {
     value: 41,
     name: '邗江区'
   },
   {
     value: 40,
     name: '开发区'
   },
   {
     value: 38,
     name: '江都区'
   },
   {
     value: 33,
     name: '瘦西湖景区'
   },

 ]
 let attackSourcesColor = [
   new echarts.graphic.LinearGradient(0, 1, 1, 1, [
     { offset: 0, color: 'rgba(254, 69, 97, 0)' },
     { offset: 1, color: 'rgba(254, 69, 97, 1)' }
   ]),
   new echarts.graphic.LinearGradient(0, 1, 1, 1, [
     { offset: 0, color: 'rgba(254, 69, 97, 0)' },
     { offset: 1, color: 'rgba(255, 155, 0, 1)' }
   ]),
   new echarts.graphic.LinearGradient(0, 1, 1, 1, [
     { offset: 0, color: 'rgba(254, 69, 97, 0)' },
     { offset: 1, color: 'rgba(233, 217, 0, 1)' }
   ]),
   new echarts.graphic.LinearGradient(0, 1, 1, 1, [
     { offset: 0, color: 'rgba(0, 245, 255, 0)' },
     { offset: 1, color: 'rgba(0, 245, 255, 1)' }
   ])
 ]
 const options = {
   backgroundColor: '#0c1934',
   //你的代码
   tooltip: {
     trigger: 'axis',
     formatter(params) {
       for (var i = 0; i < params.length; i++) {
         return params[i].name + ':' + params[i].data.value + '宗'
       }
     }
   },
   grid: {
     containLabel: true,
     bottom: '10%',
     left: '-5%',
     top: '10%',
     right: '10%'
   },
   xAxis: {
     type: 'value',
     axisLabel: {
       show: false
     },
     axisLine: {
       show: false
     },
     axisTick: {
       show: false
     },
     splitLine: {
       show: false
     }
   },
   yAxis: [
     {
       type: 'category',
       data: echartData.map((item) => item.name),
       inverse: true,
       position: 'left',
       axisLabel: {
         fontSize: '18px',
         padding: [-3, 0, 0, 0],
         margin: 18, //刻度标签与轴线之间的距离
         formatter: function (value, index) {
           if (index < 3) {
             return `{img${index}|}`
           } else {
             return `{b|${index + 1}}`
           }
         },
         rich: {
           b: {
             color: '#fff',
             backgroundColor: 'rgba(0, 165, 232, 0.20)',
             borderWidth: 2,
             width: 23,
             height: 23,
             align: 'center',
             borderRadius: 23,
             fontSize: 12
           },
           img0: {
             width: 24,
             height: 28,
             backgroundColor: {
               image: first,
               repeat: 'no-repeat'
             }
           },
           img1: {
             width: 24,
             height: 28,
             backgroundColor: {
               image: second,
               repeat: 'no-repeat'
             }
           },
           img2: {
             width: 24,
             height: 28,
             backgroundColor: {
               image: third,
               repeat: 'no-repeat'
             }
           }
         }
       },
       axisLine: {
         show: false
       },
       axisTick: {
         show: false
       },
       splitLine: {
         show: false
       }
     },
     {
       type: 'category',
       data: echartData.map((item) => item.value),
       inverse: true,
       position: 'right',
       axisLabel: {
         padding: [-3, 0, 0, 0],
         margin: 10, //刻度标签与轴线之间的距离
         formatter: function (value, index) {
           return `{a|${echartData[index].value}}{b|宗}`
         },
         rich: {
           a: {
             fontSize: 15,
             color: '#fff',
             padding: [4, 5, 0, 0]
           },
           b: {
             padding: [4, 0, 0, 0]
           }
         }
       },
       axisLine: {
         show: false
       },
       axisTick: {
         show: false
       },
       splitLine: {
         show: false
       }
     },
     {
       type: 'category',
       inverse: true,
       position: 'left',
       axisLine: {
         show: false
       },
       axisTick: {
         show: false
       },
       data: echartData.map((item) => item.name),
       axisLabel: {
         show: true,
         margin: -2,
         fontSize: 12,
         align: 'top',
         verticalAlign: 'bottom',
         padding: [0, 0, 10, 0],
         color: '#fff'
       }
     }
   ],
   series: [
     {
       data: echartData.map((item, i) => {
         let itemStyle = {
           color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i]
         }
         return {
           value: item.value,
           itemStyle: itemStyle
         }
       }),
       type: 'bar',
       barWidth: 6,
       showBackground: true,
       backgroundStyle: {
         color: 'rgba(32, 104, 118, 1)',
         borderRadius: 30
       },
       label: {
         show: true,
         position: 'insideRight',
         distance: -10,
         formatter: (params) => {
           if (params.dataIndex < 3) {
             return `{img${params.dataIndex}|}`
           } else {
             return `{b|}`
           }
         },
         rich: {
           b: {
             widht: 18,
             height: 18,
             backgroundColor: {
               image: frist_dot,
               repeat: 'no-repeat'
             }
           },
           img0: {
             width: 18,
             height: 18,
             backgroundColor: {
               image: second_dot,
               repeat: 'no-repeat'
             }
           },
           img1: {
             width: 18,
             height: 18,
             backgroundColor: {
               image: third_dot,
               repeat: 'no-repeat'
             }
           },
           img2: {
             width: 18,
             height: 18,
             backgroundColor: {
               image: normal_dot,
               repeat: 'no-repeat'
             }
           }
         }
       }
     }
   ]
 }

  return (
    <div className="BottomBarRightBox">
      <ReactECharts option={options} />
    </div>
  )
}

export default BottomBarBox