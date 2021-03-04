<!--
 * @Author: linzq
 * @Date: 2021-03-03 16:54:20
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-03 17:39:32
 * @Description: 
-->
<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="typeCharts" style="width: 100%;height: 100%;" />
</template>
 
<script>
import * as echarts from 'echarts'
export default {
  name: '',
  data() {
    return {
      charts: '',
      dataAxis: [
        '点',
        '击',
        '柱',
        '子',
        '或',
        '者',
        '两',
        '指',
        '在',
        '触',
        '屏',
        '上',
        '滑',
        '动',
        '能',
        '够',
        '自',
        '动',
        '缩',
        '放'
      ],
      data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220],
      yMax: 500,
      dataShadow: [],
      option: undefined
    }
  },
  methods: {
    loadEcharts() {
      this.charts = echarts.init(document.getElementById('typeCharts'))
      for (var i = 0; i < this.data.length; i++) {
        this.dataShadow.push(this.yMax)
      }
      this.option = {
        grid: {
          top: '13%'
        },
        xAxis: {
          data: this.dataAxis,
          axisTick: {
            show: false
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
              normal: { color: 'rgba(0,0,0,0.05)' }
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
  mounted() {
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
