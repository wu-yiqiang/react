import * as React from 'react'
import ReactECharts from 'echarts-for-react'
import "./MiddleLeftPieBox.scss";
import centerImage from "@/assets/images/center.png";
import NodeImage from "@/assets/images/node.png";
const MiddleLeftPieBox: React.FC = () => {
  const [options, setOptions] = React.useState<any>({});
  const color = ["#ffffff", "#36fff6", "#ffe93a", "#67f95f"];
  let oneArr = [
    {
      name: "数据统一平台",
      type: 0,
      symbol: "image://" + centerImage,
      symbolSize: 70,
    },
  ];
  let erArr = [
    {
      name: "物管平台数据",
      type: 1,
    },
    {
      name: "调度中心",
      type: 3,
    },
    {
      name: "决策系统数据",
      type: 1,
    },
    {
      name: "综合管控平台数据",
      type: 1,
    },
    {
      name: "其他业务数据",
      type: 2,
    },
    {
      name: "省营销数据",
      type: 1,
    },
    {
      name: "地市营销数据",
      type: 1,
    },
    {
      name: "行业专卖数据",
      type: 1,
    },
  ]
  let allArr = [...oneArr, ...erArr],
  dataArr = [];
  // 点
  allArr.forEach((el, ind) => {
    if (el.type > 0) {
      el.symbolSize = 50;
      el.symbol = "image://" + NodeImage;
      el.itemStyle = {
        color: color[el.type],
      };
    }
    el.label = {
      show: true,
      position: "bottom",
      distance: 10,
      color: color[el.type],
    };
  });

  // 圆形分区
  function group(arr, r) {
    const newArray = [];
    const arLen = arr.length;
    arr.forEach((e, ind) => {
      // 按角度均匀分布
      const ang = 90 - (360 / arLen).toFixed(2) * (ind + 1);
      const x = Math.cos((ang * Math.PI) / 180).toFixed(2) * r;
      const y = Math.sin((ang * Math.PI) / 180).toFixed(2) * r;
      const x1 = Math.cos((ang * Math.PI) / 180).toFixed(2) * (r - 5);
      const y1 = Math.sin((ang * Math.PI) / 180).toFixed(2) * (r - 5);
      const x0 = Math.cos((ang * Math.PI) / 180).toFixed(2) * (r - 30);
      const y0 = Math.sin((ang * Math.PI) / 180).toFixed(2) * (r - 30);
      e.value = [x.toFixed(2), y.toFixed(2)];
      e.twoPoint = [
        [x1.toFixed(2), y1.toFixed(2)],
        [x0.toFixed(2), y0.toFixed(2)],
      ];
      newArray.push(e);
    });
    return newArray;
  }

  // 线配置
  function linesConfig(arr) {
    const [dataArr, targetCoord] = [[], [0, 0]];
    arr.forEach((el) => {
      function getFormatItem(start, end) {
        let item = [
          { coord: el.twoPoint[start] }, // 起点
          {
            coord: el.twoPoint[end],
            lineStyle: {
              color: color[el.type],
              curveness: el.type === 3 ? 0.1 : 0,
            },
            effect: {
              color: color[el.type],
            },
          }, // 终点
        ];
        return item;
      }
      switch (el.type) {
        case 0:
          break;
        case 1:
          dataArr.push(getFormatItem(0, 1));
          break;
        case 2:
          dataArr.push(getFormatItem(1, 0));
          break;
        case 3:
          dataArr.push(getFormatItem(0, 1));
          dataArr.push(getFormatItem(1, 0));
          break;
      }
    });
    return dataArr;
  }

  // 点分布
  oneArr = group(oneArr, 0);
  erArr = group(erArr, 40);
  // twoArr = group(twoArr, -50);

  allArr = [...oneArr, ...erArr];
  // 线坐标和配置
  dataArr = linesConfig(allArr);

  function generateData(totalNum, bigvalue, smallvalue, color) {
    let dataArr = [];
    for (var i = 0; i < totalNum; i++) {
      if (i % 2 === 0) {
        dataArr.push({
          name: (i + 1).toString(),
          value: bigvalue,
          itemStyle: {
            color: color,
            borderWidth: 0,
          },
        });
      } else {
        dataArr.push({
          name: (i + 1).toString(),
          value: smallvalue,
          itemStyle: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0,
          },
        });
      }
    }
    return dataArr;
  }

  let dolitData = generateData(100, 25, 20, "rgb(126,190,255)");
  let threeData = generateData(6, 40, 10, "#2dc0c9");

  function getOption(startAngle, radius) {
    let options = {
      title: {
        text: "调度中心数据流向",
        left:'center',
        textStyle: {
          textAlign: "center",
          color: "#fff",
          fontSize: 18,
        },
      },
      backgroundColor: "#081c47",
      xAxis: {
        show: false,
        type: "value",
        max: 50,
        min: -51,
      },
      grid: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
      yAxis: {
        show: false,
        type: "value",
        max: 50,
        min: -50,
      },
      series: [
        {
          name: "节点",
          type: "graph",
          silent: false,
          hoverAnimation: false, // 鼠标悬浮高亮
          cursor: "default",
          coordinateSystem: "cartesian2d",
          z: 3,
          itemStyle: {
            shadowColor: "none",
          },
          emphasis: {
            scale: false,
          },
          data: allArr,
        },
        {
          name: "线图",
          type: "lines",
          hoverAnimation: false,
          silent: false,
          cursor: "default",
          coordinateSystem: "cartesian2d",
          polyline: false, // 多线段
          z: 1,
          lineStyle: {
            width: 2,
            type: "dashed",
            curveness: 0,
          },
          effect: {
            show: true,
            period: 8, //箭头指向速度，值越小速度越快
            trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: "arrow", //箭头图标
            symbolSize: 6,
          },
          emphasis: {
            lineStyle: {
              type: "dashed",
            },
          },
          data: dataArr,
        },
        {
          name: "不动外圆",
          type: "pie",
          zlevel: 4,
          silent: true,
          radius: ["50%", "49%"],
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: dolitData,
        },
        {
          type: "pie",
          name: "旋转圆",
          zlevel: 20,
          silent: true,
          radius: ["40%", "39%"], //圆的大小
          hoverAnimation: false,
          startAngle: startAngle,
          data: threeData,
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
        },
        {
          name: "缩放圆",
          type: "pie",
          zlevel: 4,
          silent: true,
          radius: [radius + 1 + "%", radius + "%"],
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: dolitData,
        },
      ],
    };
    return options;
  }

  let startAngle = 50; // 初始旋转角度
  let [minradius, radius, maxradius] = [24, 24, 28]; // 初始缩放尺寸
  let isBig = true; // 缩放动画 标识
  function draw() {
    startAngle = startAngle - 5;
    if (isBig) {
      radius = radius + 0.5;
      if (radius > maxradius) {
        isBig = false;
      }
    } else {
      radius = radius - 0.5;
      if (radius < minradius) {
        isBig = true;
      }
    }
    const options = getOption(startAngle, radius);
    setOptions(options);
  }
  // draw();
  const timer = setInterval(draw, 2000);
  return (
    <div className="MiddleLeftPieBox">
      <ReactECharts option={options} />
    </div>
  );
};

export default MiddleLeftPieBox;