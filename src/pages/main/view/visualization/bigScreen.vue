<!--
 * @Author: linzq
 * @Date: 2021-03-01 10:14:28
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-22 14:43:55
 * @Description: 可视化
-->
<template>
  <div class="base-wrap" style="padding: 0;border: 1px solid #fff;">
    <span>
      <div id="map"></div>
      <div class="mapDivtop"></div>
    </span>

    <div style="position: relative; height: 100%; width: 100%; pointer-events: none">
      <div style="display: flex; pointer-events: auto; color: #eee; height: 65px; width: 100%">
        <div class="head">
          <p style="margin: 0;padding-left: 42%;">可视化案例</p>
        </div>
        <span class="time">{{dateTime}}</span>
      </div>

      <div class="flex-grid">
        <div class="cell pointer-auto">
          <i class="el-icon-menu title-icon" />
          <span class="title">实时景区类型人气值</span>
          <dv-decoration-4 :reverse="true" style="width:250px;height: 10px;" />
          <typePopularity />
        </div>
        <div class="cell" />
        <div class="cell pointer-auto">
          <i class="el-icon-menu title-icon" />
          <span class="title">实时在园游客前十省份</span>
          <dv-decoration-4 :reverse="true" style="width:250px;height: 10px;" />
          <dv-scroll-ranking-board :config="config" style="width:100%;height:85%" />
        </div>

        <div class="cell pointer-auto">
          <i class="el-icon-menu title-icon" />
          <span class="title">景区类型</span>
          <dv-decoration-4 :reverse="true" style="width:250px;height: 10px;" />
          <typePie />
        </div>

        <div class="cell">
          <div v-show="showInfo" class="infoWindows">
            <div class="detail">
              <strong>名称：</strong><span>{{form.dest_name}}</span>
            </div>
            <div class="detail">
              <strong>排名：</strong><span>{{form.ranking}}</span>
            </div>
            <div class="detail">
              <strong>在园游客：</strong><span>{{form.tourists_num}}</span>
            </div>
            <div class="detail">
              <strong>景区等级：</strong><span>{{form.grade_2020}}A级</span>
            </div>
          </div>
        </div>
        <div class="cell pointer-auto">
          <i class="el-icon-menu title-icon" />
          <span class="title">年游客量/等级趋势图</span>
          <dv-decoration-4 :reverse="true" style="width:250px;height: 10px;" />
          <trend />
        </div>
        <div class="cell pointer-auto">
          <i class="el-icon-menu title-icon" />
          <span class="title">景点流量实时数据</span>
          <dv-decoration-4 :reverse="true" style="width:250px;height: 10px;" />
          <todayData />
        </div>
        <div class="cell pointer-auto">
          <i class="el-icon-menu title-icon" />
          <span class="title">近十五日游客流量情况</span>
          <dv-decoration-4 :reverse="true" style="width:250px;height: 10px;" />
          <echartTotal />
        </div>
        <div class="cell pointer-auto">
          <i class="el-icon-menu title-icon" />
          <span class="title">景区等级情况</span>
          <el-select size="mini" class='year' :popper-append-to-body="false" popper-class="select-pop" v-model="yearValue"
            placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <dv-decoration-4 :reverse="true" style="width:250px;height: 10px;" />
          <scenicNum :year="yearValue" />
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
var map
import scenicNum from './components/scenicNum' // 景区数量
import echartTotal from './components/echartTotal' // 近15日游客请客
import typePopularity from './components/typePopularity' // 类型人气
import typePie from './components/typePie' // 景区划分
import todayData from './components/todayData' // 今日数据
import trend from './components/trend' // 趋势
import { parseTime } from '@/utils'

export default {
  name: 'BigScreen',
  components: { scenicNum, echartTotal, typePopularity, typePie, todayData, trend },
  data() {
    return {
      dateTime: parseTime(new Date()),
      showInfo: false,
      options: [
        { value: '2015', label: '2015' },
        { value: '2016', label: '2016' },
        { value: '2017', label: '2017' },
        { value: '2018', label: '2018' },
        { value: '2019', label: '2019' },
        { value: '2020', label: '2020' }
      ],
      yearValue: '2020',
      config: {
        data: []
      },
      form: {}
    }
  },
  async created() {
    const res = await this.$api.bigScreen.allList()
    const top = await this.$api.bigScreen.topTen()
    this.config = { data: top.topTen }
    const data = []
    // 构造数据
    for (const item of res.list) {
      data.push({
        geometry: {
          type: 'Point',
          coordinates: [item.lng, item.lat]
        },
        count: 10 * Math.random()
      })
    }
    const _this = this
    const dataSet = new mapv.DataSet(data)
    const options = {
      size: 13,
      gradient: { 0.25: 'rgb(0,0,255)', 0.55: 'rgb(0,255,0)', 0.85: 'yellow', 1.0: 'rgb(255,0,0)' },
      max: 100,
      // range: [0, 100], // 过滤显示数据范围
      // minOpacity: 0.5, // 热力图透明度
      // maxOpacity: 1,
      draw: 'heatmap',
      methods: {
        click: function (item) {
          console.log(item)
          _this.click1(item?.geometry)
        }
      }
    }
    var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options)
  },
  async mounted() {
    setInterval(() => {
      this.dateTime = parseTime(new Date())
    }, 1000)
    map = new BMap.Map('map', {
      enableMapClick: false,
      minZoom: 4,
      maxZoom: 15
    }) // 创建Map实例
    map.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5) // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    map.setMapStyle({
      style: 'midnight'
    })
  },
  computed: {},
  methods: {
    async click1(data) {
      if (data.coordinates) {
        const params = {
          lng: data.coordinates[0],
          lat: data.coordinates[1]
        }
        const res = await this.$api.bigScreen.detail(params)
        this.form = res[0]
        if (res.length > 0) {
          this.showInfo = true
        }
        // console.log(res)
      }
      const times = setTimeout(() => {
        this.showInfo = false
        clearTimeout(times)
      }, 4000)
    }
  }
}
</script>
 
<style lang="less" scoped>
.flex-grid {
  margin: 10px;
  display: grid;
  grid-template-columns: 29% 45% 25%;
  grid-template-rows: 30% 30% 37%;
  height: calc(100% - 65px); //padding 有个20的宽度
  // background-color: #000;
  grid-gap: 5px;
  color: #000;
  // pointer-events: none;
  .cell {
    // background-color: rgba(56, 155, 255, 0.1);
    color: beige;
    .infoWindows {
      width: 240px;
      height: 100px;
      background-color: #0c3660bf;
      border-radius: 10px;
      position: relative;
      top: 50%;
      left: 10%;
      color: #eee;
      padding: 12px;
      .detail {
        height: 28px;
        line-height: 28px;
        width: 215px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .year {
      float: right;
      margin-right: 40px;
      width: 100px;
    }
  }
  .title-icon {
    font-size: 1.3rem;
    font-style: italic;
  }
  .title {
    font-size: 1.3rem;
    font-style: italic;
    margin: 4px;
    font-weight: 600;
  }
}

.head {
  width: 80%;
  background: url('./../../../../assets/img/bigScreen_head.png') no-repeat;
  height: 50px;
  margin: 15px auto 0;
  letter-spacing: 10px;
  font-size: 1.8rem;
  font-weight: 600;
}
.time {
  position: fixed;
  right: 20px;
  height: 65px;
  line-height: 65px;
  font-size: 1.3rem;
}
.pointer-none {
  pointer-events: none;
}
.pointer-auto {
  pointer-events: auto;
}

#map {
  position: absolute;
  width: 100%;
  height: 100%;
}
.mapDivtop {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('./../../../../assets/img/bg.png');
  pointer-events: none; /* 上层加上这句样式可以实现点击穿透 */
  background-size: 100% 100%;
}

// 选择器透明背景
/deep/ .el-input__inner {
  background-color: rgba(0, 0, 0, 0);
  // font-style: italic;
}
/deep/ .el-select-dropdown__item {
  line-height: 20px;
  height: 20px;
  color: #eee;
}
/deep/.el-select-dropdown__item.hover {
  background-color: #002b6b;
}
</style>

<style lang="less">
// 选择器下拉框样式
.select-pop {
  background-color: #010629;
  // font-style: italic;
}
</style>
