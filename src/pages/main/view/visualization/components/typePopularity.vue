<!--
 * @Author: linzq
 * @Date: 2021-03-03 16:54:20
 * @LastEditors: linzq
 * @LastEditTime: 2021-04-21 16:05:56
 * @Description: 
-->
<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="typeCharts" style="width: 100%;height: 100%;" />
</template>
 
<script>
// import * as echarts from 'echarts'
export default {
  name: '',
  data() {
    return {
      charts: '',
      // 1:文博院馆;2:寺庙观堂; 3:旅游度假区; 4:自然保护区; 5:主题公园; 6:森林公园; 7:地质公园; 8:游乐园; 9:动物园; 0:植物园
      dataAxis: [
        '植物园',
        '文博院馆',
        '寺庙观堂',
        '旅游度假区',
        '自然保护区',
        '主题公园',
        '森林公园',
        '地质公园',
        '游乐园',
        '动物园'
      ],
      data: [],
      yMax: 500,
      dataShadow: [],
      option: undefined
    }
  },
  methods: {
    loadEcharts() {
      this.charts = echarts.init(document.getElementById('typeCharts'))
      // for (var i = 0; i < this.data.length; i++) {
      //   this.dataShadow.push(this.yMax)
      // }
      this.option = {
        grid: {
          top: '13%'
        },
        xAxis: {
          data: this.dataAxis,
          axisTick: {
            show: false
          },
          axisLabel: {
            //重点在这一块，其余可以忽略
            interval: 0, //这个一定要有，别忘记了
            rotate: 15,
            textStyle: {
              color: '#eee',
              fontSize: 11
            }
          }
        },
        yAxis: {
          name: '游客总数(万人)',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            // For shadow
            type: 'bar',
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0.05)'
              }
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: this.dataShadow,
            animation: false
          },
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ])
                // label: {
                //   show: true, //开启显示
                //   position: 'top', //在上方显示
                //   textStyle: {
                //     //数值样式
                //     color: '#eee',
                //     fontSize: 12
                //   }
                // }
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: this.data
          }
        ]
      }
      this.charts.setOption(this.option)
    }
  },
  //调用
  async mounted() {
    const top = await this.$api.bigScreen.topTen()
    const data = []
    for (const key in top.typeNum) {
      this.data[top.typeNum[key].typeId] = (Number(top.typeNum[key].total) / 10000).toFixed(2)
    }
    this.$nextTick(function () {
      this.loadEcharts()
    })

    let that = this
    let myChart = echarts.init(document.getElementById('typeCharts'))

    // Enable data zoom when user click bar.
    var zoomSize = 6
    myChart.on('click', function (params) {
      myChart.dispatchAction({
        type: 'dataZoom',
        startValue: that.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: that.dataAxis[Math.min(params.dataIndex + zoomSize / 2, that.data.length - 1)]
      })
    })
  }
}
</script>
<style scoped>
</style>
