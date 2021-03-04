<!--
 * @Author: linzq
 * @Date: 2021-03-03 16:15:05
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-03 16:52:40
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
      colors: ['#5470C6', '#91CC75', '#EE6666']
    }
  },
  methods: {
    init() {
      let myChart = this.$echarts.init(this.$refs.trendCharts)
      this.myChart = myChart
      myChart.setOption({
        backgroundColor: 'rgba(56,155,255,0)',
        color: this.colors,

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['蒸发量', '平均温度', '平均温度1'],
          selectedMode: false
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '游客数量(万人)',
            min: 0,
            max: 250,
            position: 'left',
            axisLine: {
              show: true,
              lineStyle: {
                color: this.colors[0]
              }
            }
          },
          {
            type: 'value',
            name: '景点总数(家)',
            min: 0,
            max: 25,
            position: 'right',
            axisLine: {
              show: true,
              lineStyle: {
                color: this.colors[2]
              }
            }
          }
        ],
        series: [
          {
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          },
          {
            name: '平均温度1',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 13.0, 7.2]
          }
        ]
      })
    }
  },
  mounted() {
    this.init() // 初始化图表
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
