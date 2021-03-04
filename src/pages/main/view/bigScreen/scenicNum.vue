<!--
 * @Author: linzq
 * @Date: 2021-03-02 15:35:11
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-03 11:13:20
 * @Description: 景区等级
-->
<template>
  <div>
    <div id="myChart" style="width: 100%; height: 20vh"></div>
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
      let myChart = this.$echarts.init(document.getElementById('myChart'), 'dark')
      // 绘制图表
      myChart.setOption({
        // color: ['#23D864', '#FF4D51'],
        backgroundColor: 'rgba(56,155,255,0)',
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}家'
        },
        // legend: { orient: 'vertical', left: 'right', top: '30%' },
        title: {
          text: '总数(家)',
          x: 'center',
          y: 'center',
          top: ' 45%'
        },
        graphic: [
          {
            //环形图中间添加文字
            type: 'text', //通过不同top值可以设置上下显示
            left: 'center',
            top: '63%',
            style: {
              text: this.scenicTotal,
              textAlign: 'center',
              fill: '#ddd', //文字的颜色
              font: 'bolder 1.5em "Microsoft YaHei", sans-serif'
            }
          }
        ],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['65%', '80%'],
            center: ['50%', '60%'],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 5,
              borderColor: '#fff',
              borderWidth: 0
            },
            label: {
              position: 'outer',
              alignTo: 'edge',
              margin: 20
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
            center: ['50%', '60%'],
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
