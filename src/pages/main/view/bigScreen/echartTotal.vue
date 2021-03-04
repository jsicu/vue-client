<!--
 * @Author: linzq
 * @Date: 2021-03-02 16:02:58
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-03 17:40:14
 * @Description: 游客总数折线图
-->
<template>
  <div id="chartLine" style="width: 100%; height: 100%"></div>
</template>

<script>
export default {
  name: 'echartTotal',
  components: {},
  data() {
    return {
      resizeTimer: null,
      myChart: null
    }
  },
  mounted() {
    this.drawLine() // 初始化图表
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
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('chartLine'), 'dark')
      this.myChart = myChart
      // 绘制图表
      myChart.setOption({
        backgroundColor: 'rgba(56,155,255,0)',
        grid: {
          top: '13%'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          name: '游客总数'
        },

        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      })
    }
  }
}
</script>

