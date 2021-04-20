<!--
 * @Author: linzq
 * @Date: 2021-03-02 15:35:11
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-06 13:27:00
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
  props: {
    year: {
      defautl: '2020',
      type: String
    }
  },
  data() {
    return {
      myChart: null,
      options: {
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
          top: ' 40%'
        },
        graphic: [
          {
            //环形图中间添加文字
            type: 'text', //通过不同top值可以设置上下显示
            left: 'center',
            top: '60%',
            style: {
              text: 0,
              textAlign: 'center',
              fill: '#ddd', //文字的颜色
              font: 'bolder 1.5em "Microsoft YaHei", sans-serif'
            }
          }
        ],
        series: [
          {
            name: '景区等级',
            type: 'pie',
            radius: ['65%', '80%'],
            center: ['50%', '55%'],
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
              { value: 0, name: 'A级' },
              { value: 0, name: 'AA级' },
              { value: 0, name: 'AAA级' },
              { value: 0, name: 'AAAA级' },
              { value: 0, name: 'AAAAA级' }
            ]
          },
          // 边框的设置
          {
            radius: ['61%', '62%'],
            center: ['50%', '55%'],
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
      }
    }
  },
  watch: {
    year: {
      handler(n, o) {
        this.getData(n)
      },
      deep: true // 深度监听父组件传过来对象变化
    }
  },
  mounted() {
    this.drawLine() // 初始化图表
    this.getData(this.year)
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
  created() {
    console.log(this.year)
  },
  methods: {
    async getData(year) {
      const res = await this.$api.bigScreen.grade({ year })
      let total = 0
      for (const key in res.grade) {
        total += res.grade[key]
        this.options.series[0].data[key].value = res.grade[key]
      }
      this.options.graphic[0].style.text = total
      this.myChart.setOption(this.options) // 绘制图表
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'), 'dark')
      this.myChart = myChart
      // 绘制图表
      myChart.setOption(this.options)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
