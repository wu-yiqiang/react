import * as React from 'react'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import './BottomMiddleBox.scss'
const BottomMiddleBox: React.FC = () => {
 var fontColor = '#30eee9'
 var timeline = {
   //loop: false,
   axisType: 'category',
   show: true,
   x: '8%',
   y: '80%',
   x2: '0%',
   y2: '10%',
   autoPlay: true,
   playInterval: 1000,
   width: 900,
   data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
   controlPosition: 'none',
   lineStyle: {
     color: '#0f496f'
   },
   label: {
     textStyle: {
       color: fontColor
     }
   },
   checkpointStyle: {
     symbolSize: 10,
     borderWidth: 10
     //symbol:'image://../web/img/active.png',
   },
   symbolSize: 10
 }
 const options = {
   //timeline基本配置都写在baseoption 中
   baseOption: {
     backgroundColor: '#11183c',
     timeline: timeline,
     grid: {
       top: '15%',
       bottom: '25%',
       left: '5%',
       right: '5%',
       containLabel: true
     },
     xAxis: [
       {
         type: 'category'
       }
     ],
     yAxis: {
       type: 'value',
       //name: 'Mwh',
       axisLine: {
         show: false
       },
       axisLabel: {
         textStyle: {
           color: '#2ededf'
         }
       },
       splitLine: {
         show: true,
         onGap: true,
         lineStyle: {
           color: '#064486'
         }
       }
     },
     series: [
       {
         type: 'bar',
         barWidth: 15,
         itemStyle: {
           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
             {
               offset: 0,
               color: '#30ebe7'
             },
             {
               offset: 1,
               color: '#0173ff'
             }
           ])
         }
       }
     ],
     tooltip: {}
   },
   //变量则写在options中
   options: [
     {
       xAxis: [
         {
           data: ['开发部', '产品部', '系统一部', '系统二部', '集成部', 'EE', 'FF', 'AA', 'BB', 'SS'],
           axisLabel: {
             rotate: -40,
             color: '#29d0d0'
           },
           axisLine: {
             lineStyle: {
               color: '#064485'
             }
           }
         }
       ],
       title: {
         text: '人均学习时长',
         x: '5%',
         y: '5%',
         textStyle: {
           color: '#2ededf',
           fontSize: 12
         }
       },
       series: [
         {
           data: [225, 175, 175, 155, 100, 20, 80, 99, 34, 88]
         }
       ]
     },
     {
       xAxis: [
         {
           data: ['开发部', '产品部', '系统一部', '系统二部', '集成部', 'EE', 'FF', 'AA', 'BB', 'SS'],
           axisLabel: {
             rotate: -40,
             color: '#29d0d0'
           },
           axisLine: {
             lineStyle: {
               color: '#064485'
             }
           }
         }
       ],
       title: {
         text: '人均学习时长'
         //subtext: '单位:Mwh'
       },
       series: [
         {
           data: [225, 5, 175, 89, 100, 20, 20, 99, 34, 88]
         }
       ]
     },
     {
       xAxis: [
         {
           data: ['开发部', '产品部', '系统一部', '系统二部', '集成部', 'EE', 'FF', 'AA', 'BB', 'SS'],
           axisLabel: {
             rotate: -40,
             color: '#29d0d0'
           },
           axisLine: {
             lineStyle: {
               color: '#064485'
             }
           }
         }
       ],
       title: {
         text: '人均学习时长'
         //subtext: '单位:Mwh'
       },
       series: [
         {
           data: [90, 5, 175, 89, 34, 20, 20, 12, 34, 199]
         }
       ]
     },
     {
       xAxis: [
         {
           data: ['开发部', '产品部', '系统一部', '系统二部', '集成部', 'EE', 'FF', 'AA', 'BB', 'SS'],
           axisLabel: {
             rotate: -40,
             color: '#29d0d0'
           },
           axisLine: {
             lineStyle: {
               color: '#064485'
             }
           }
         }
       ],
       title: {
         text: '人均学习时长'
         //subtext: '单位:Mwh'
       },
       series: [
         {
           data: [225, 175, 175, 155, 100, 20, 80, 99, 34, 88]
         }
       ]
     },
     {
       xAxis: [
         {
           data: ['开发部', '产品部', '系统一部', '系统二部', '集成部', 'EE', 'FF', 'AA', 'BB', 'SS'],
           axisLabel: {
             rotate: -40,
             color: '#29d0d0'
           },
           axisLine: {
             lineStyle: {
               color: '#064485'
             }
           }
         }
       ],
       title: {
         text: '人均学习时长'
         //subtext: '单位:Mwh'
       },
       series: [
         {
           data: [225, 5, 175, 89, 100, 20, 20, 99, 34, 88]
         }
       ]
     },
     {
       xAxis: [
         {
           data: ['开发部', '产品部', '系统一部', '系统二部', '集成部', 'EE', 'FF', 'AA', 'BB', 'SS'],
           axisLabel: {
             rotate: -40,
             color: '#29d0d0'
           },
           axisLine: {
             lineStyle: {
               color: '#064485'
             }
           }
         }
       ],
       title: {
         text: '人均学习时长'
         //subtext: '单位:Mwh'
       },
       series: [
         {
           data: [90, 5, 175, 89, 34, 20, 20, 12, 34, 199]
         }
       ]
     },
     {
       xAxis: [
         {
           data: ['开发部', '产品部', '系统一部', '系统二部', '集成部', 'EE', 'FF', 'AA', 'BB', 'SS'],
           axisLabel: {
             rotate: -40,
             color: '#29d0d0'
           },
           axisLine: {
             lineStyle: {
               color: '#064485'
             }
           }
         }
       ],
       title: {
         text: '人均学习时长'
         //subtext: '单位:Mwh'
       },
       series: [
         {
           data: [225, 175, 175, 155, 100, 20, 80, 99, 34, 88]
         }
       ]
     },
     {
       xAxis: [
         {
           data: ['开发部', '产品部', '系统一部', '系统二部', '集成部', 'EE', 'FF', 'AA', 'BB', 'SS'],
           axisLabel: {
             rotate: -40,
             color: '#29d0d0'
           },
           axisLine: {
             lineStyle: {
               color: '#064485'
             }
           }
         }
       ],
       title: {
         text: '人均学习时长'
         //subtext: '单位:Mwh'
       },
       series: [
         {
           data: [225, 5, 175, 89, 100, 20, 20, 99, 34, 88]
         }
       ]
     },
     {
       xAxis: [
         {
           data: ['开发部', '产品部', '系统一部', '系统二部', '集成部', 'EE', 'FF', 'AA', 'BB', 'SS'],
           axisLabel: {
             rotate: -40,
             color: '#29d0d0'
           },
           axisLine: {
             lineStyle: {
               color: '#064485'
             }
           }
         }
       ],
       title: {
         text: '人均学习时长'
         //subtext: '单位:Mwh'
       },
       series: [
         {
           data: [90, 5, 175, 89, 34, 20, 20, 12, 34, 199]
         }
       ]
     },
     {
       xAxis: [
         {
           data: ['开发部', '产品部', '系统一部', '系统二部', '集成部', 'EE', 'FF', 'AA', 'BB', 'SS'],
           axisLabel: {
             rotate: -40,
             color: '#29d0d0'
           },
           axisLine: {
             lineStyle: {
               color: '#064485'
             }
           }
         }
       ],
       title: {
         text: '人均学习时长'
         //subtext: '单位:Mwh'
       },
       series: [
         {
           data: [225, 175, 175, 155, 100, 20, 80, 99, 34, 88]
         }
       ]
     },
     {
       xAxis: [
         {
           data: ['开发部', '产品部', '系统一部', '系统二部', '集成部', 'EE', 'FF', 'AA', 'BB', 'SS'],
           axisLabel: {
             rotate: -40,
             color: '#29d0d0'
           },
           axisLine: {
             lineStyle: {
               color: '#064485'
             }
           }
         }
       ],
       title: {
         text: '人均学习时长'
         //subtext: '单位:Mwh'
       },
       series: [
         {
           data: [225, 5, 175, 89, 100, 20, 20, 99, 34, 88]
         }
       ]
     },
     {
       xAxis: [
         {
           data: ['开发部', '产品部', '系统一部', '系统二部', '集成部', 'EE', 'FF', 'AA', 'BB', 'SS'],
           axisLabel: {
             rotate: -40,
             color: '#29d0d0'
           },
           axisLine: {
             lineStyle: {
               color: '#064485'
             }
           }
         }
       ],
       title: {
         text: '人均学习时长'
         //subtext: '单位:Mwh'
       },
       series: [
         {
           data: [90, 5, 175, 89, 34, 20, 20, 12, 34, 199]
         }
       ]
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