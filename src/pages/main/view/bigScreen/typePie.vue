<!--
 * @Author: linzq
 * @Date: 2021-03-02 15:35:11
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-04 19:45:31
 * @Description: 景区划分
-->
<template>
  <div>
    <div id="typePie" style="width: 100%; height: 20vh"></div>
  </div>
</template>

<script>
export default {
  name: 'scenicNum',
  components: {},
  data() {
    return {
      scenicTotal: 990,
      percent1: 30,
      percent2: 70,
      year: '2018-10-20',
      time: '10:05:03'
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
      let myChart = this.$echarts.init(document.getElementById('typePie'), 'dark')
      // 绘制图表
      myChart.setOption({
        backgroundColor: 'rgba(56,155,255,0)',
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}家'
        },
        legend: [
          {
            left: 0,
            orient: 'vertical',
            data: ['AAAA级', 'AAA级', 'AAA级'],
            right: 'right',
            top: 'middle',
            selectedMode: false
          },
          {
            right: 0,
            data: ['AAAAA级', 'A级'],
            left: 'right',
            orient: 'vertical',
            top: 'middle',
            selectedMode: false
          }
        ],
        // 1:文博院馆;2:寺庙观堂; 3:旅游度假区; 4:自然保护区; 5:主题公园; 6:森林公园; 7:地质公园; 8:游乐园; 9:动物园; 0:植物园
        series: [
          {
            name: '景点划分',
            type: 'pie',
            radius: ['65%', '80%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 5,
              borderColor: '#fff',
              borderWidth: 0
            },
            legend: {},
            label: {
              show: false,
              position: 'center'
            },

            data: [
              { value: this.percent1, name: 'A级' },
              { value: this.percent1, name: 'AA级' },
              { value: this.percent1, name: 'AAA级' },
              { value: this.percent1, name: 'AAAA级' },
              { value: this.percent2, name: 'AAAAA级' }
            ]
          },
          // 边框的设置
          {
            radius: ['61%', '62%'],
            center: ['50%', '50%'],
            type: 'pie',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            animation: false,
            tooltip: {
              show: false
            },
            data: [
              {
                value: 1,
                itemStyle: {
                  color: 'rgba(250,250,250,1)'
                }
              }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
