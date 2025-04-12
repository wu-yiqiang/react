import * as React from 'react'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import './BottomMiddleBox.scss'
const BottomMiddleBox: React.FC = () => {
 let xLabel = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
 let dataValue = [20, 30, 40, 35, 34, 15, 56, 15, 12, 25, 34, 42]
 let dataValue1 = [40, 35, 34, 15, 56, 15, 12, 25, 34, 42, 20, 30]
 const options = {
   backgroundColor: '#0c2d55',
   tooltip: {
     trigger: 'axis',
     axisPointer: {
       lineStyle: {
         color: 'rgb(126,199,255)'
       }
     }
   },
   legend: {
     show: true,
     top: '10%',
     itemWidth: 30, // 图例标记的图形宽度。
     //   itemGap: 20, // 图例每项之间的间隔。
     itemHeight: 10, //  图例标记的图形高度。
     textStyle: {
       color: '#fff',
       fontSize: 14,
       padding: [0, 8, 0, 8]
     }
   },
   grid: {
     top: '10px',
     left: '30px',
     right: '30px',
     bottom: '30px'
   },
   xAxis: [
     {
       type: 'category',
       boundaryGap: false,
       axisLine: {
         //坐标轴轴线相关设置。数学上的x轴
         show: false,
         lineStyle: {
           color: 'rgb(41,188,245)'
         }
       },
       axisLabel: {
         //坐标轴刻度标签的相关设置
         textStyle: {
           color: '#FFFFFF',
           fontSize: 12
         }
       },
       splitLine: {
         show: false,
         lineStyle: {
           color: '#233653'
         }
       },
       axisTick: {
         show: false
       },
       data: xLabel
     }
   ],
   yAxis: [
     {
       name: '',
       nameTextStyle: {
         color: '#fff',
         fontSize: 12,
         padding: [0, 60, 0, 0]
       },
       // minInterval: 1,
       type: 'value',
       splitLine: {
         show: true,
         lineStyle: {
           color: '#1160a0',
           type: 'dashed'
         }
       },
       axisLine: {
         show: false,
         lineStyle: {
           color: '#008de7'
         }
       },
       axisLabel: {
         show: true,
         textStyle: {
           color: '#fff',
           fontSize: 14
         }
       },
       axisTick: {
         show: false
       }
     }
   ],
   series: [
     {
       name: '已处置数',
       type: 'line',
       symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
       smooth: true,
       lineStyle: {
         normal: {
           width: 3,
           color: '#00ffa2' // 线条颜色
         }
       },
       itemStyle: {
         normal: {
           color: '#00f0ff', //拐点颜色
           // borderColor: '#fff600',//拐点边框颜色
           // borderWidth: 13//拐点边框大小
           label: {
             show: true, //开启显示
             color: '#fff',
             position: 'top', //在上方显示
             formatter: function (res) {
               if (res.value) {
                 return res.value
               } else {
                 return 0
               }
             }
           }
         }
       },
       symbolSize: 8, //设定实心点的大小
       areaStyle: {
         normal: {
           //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
           color: new echarts.graphic.LinearGradient(
             0,
             0,
             0,
             1,
             [
               {
                 offset: 0,
                 color: '#00ffa230'
               },
               {
                 offset: 0.6,
                 color: '#00ffa220'
               },
               {
                 offset: 1,
                 color: '#00ffa210'
               }
             ],
             false
           )
         }
       },
       data: dataValue
     },
     {
       name: '预警次数',
       type: 'line',
       symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
       smooth: true,
       lineStyle: {
         normal: {
           width: 3,
           color: '#ffba00' // 线条颜色
         }
       },
       itemStyle: {
         normal: {
           color: '#fff600', //拐点颜色
           // borderColor: '#fff600',//拐点边框颜色
           // borderWidth: 13//拐点边框大小
           label: {
             show: true, //开启显示
             color: '#fff',
             position: 'top', //在上方显示
             formatter: function (res) {
               if (res.value) {
                 return res.value
               } else {
                 return 0
               }
             }
           }
         }
       },
       symbolSize: 8, //设定实心点的大小
       areaStyle: {
         normal: {
           //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
           color: new echarts.graphic.LinearGradient(
             0,
             0,
             0,
             1,
             [
               {
                 offset: 0,
                 color: '#ffba0030'
               },
               {
                 offset: 0.6,
                 color: '#ffba0020'
               },
               {
                 offset: 1,
                 color: '#ffba0010'
               }
             ],
             false
           )
         }
       },
       data: dataValue1
     }
   ]
 }
  return (
    <div className="BottomMiddleBox">
      <ReactECharts option={options} />
    </div>
  )
}

export default BottomMiddleBox