<!--
 * @Author: linzq
 * @Date: 2021-03-03 16:15:05
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-05 17:07:39
 * @Description: 趋势图
-->
<template>
  <div class="charts-comps" ref="trendCharts"></div>
</template>

<script>
export default {
  name: 'trendCharts',
  data() {
    return {
      resizeTimer: null,
      myChart: null,
      colors: ['#5470C6', '#91CC75', '#EE6666'],
      options: {
        backgroundColor: 'rgba(56,155,255,0)',
        color: ['#5470C6', '#91CC75', '#EE6666'],

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['景点总数', '游客数量'],
          selectedMode: false
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: ['2015', '2016', '2017', '2018', '2019', '2020']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '游客数量(万人)',
            // min: 0,
            // max: 250,
            position: 'left',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#5470C6'
              }
            }
          },
          {
            type: 'value',
            name: '景点总数(家)',
            // min: 0,
            // max: 25,
            position: 'right',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#EE6666'
              }
            }
          }
        ],
        series: [
          {
            name: '游客数量',
            type: 'bar',
            data: []
          },
          {
            name: '景点总数',
            type: 'line',
            yAxisIndex: 1,
            data: []
          }
        ]
      }
    }
  },
  methods: {
    async getData() {
      const res = await this.$api.bigScreen.yearTrend()
      this.options.series[0].data = res.touristTotal
      this.options.series[1].data = res.scenicTotal
      this.myChart.setOption(this.options)
    },
    init() {
      let myChart = this.$echarts.init(this.$refs.trendCharts)
      this.myChart = myChart
      myChart.setOption(this.options)
    }
  },
  mounted() {
    this.init() // 初始化图表
    this.getData()
    let _this = this
    window.addEventListener('resize', function () {
      if (_this.resizeTimer) clearTimeout(_this.resizeTimer)
      _this.resizeTimer = setTimeout(function () {
        _this.myChart.resize()
      }, 100)
    })
  },
  beforeDestroy() {
    let _this = this
    // 在组件生命周期结束的时候销毁。
    window.removeEventListener('resize', function () {
      if (_this.resizeTimer) clearTimeout(_this.resizeTimer)
      _this.resizeTimer = setTimeout(function () {
        _this.myChart.resize()
      }, 100)
    })
  }
}
</script>

<style lang="less" scoped>
.charts-comps {
  width: 100%;
  height: 100%;
}
</style>
