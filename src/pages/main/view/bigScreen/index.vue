<!--
 * @Author: linzq
 * @Date: 2021-03-01 10:14:28
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-04 17:09:20
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
          <span class="title">类型人气值</span>
          <dv-decoration-4 :reverse="true" style="width:250px;height: 10px;" />
          <typePopularity />
        </div>
        <div class="cell" />
        <div class="cell pointer-auto">
          <i class="el-icon-menu title-icon" />
          <span class="title">前十省份</span>
          <dv-decoration-4 :reverse="true" style="width:250px;height: 10px;" />
          <dv-scroll-ranking-board :config="config" style="width:100%;height:85%" />
        </div>

        <div class="cell pointer-auto">
          <i class="el-icon-menu title-icon" />
          <span class="title">前十省份</span>
          <dv-decoration-4 :reverse="true" style="width:250px;height: 10px;" />
          <typePie />
        </div>
        <div class="cell">
          <div v-show="showInfo" class="infoWindows">
            {{showInfo}}
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
          <span class="title">等级情况</span>
          <el-select size="mini" class='year' :popper-append-to-body="false" popper-class="select-pop" v-model="value"
            placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <dv-decoration-4 :reverse="true" style="width:250px;height: 10px;" />
          <scenicNum />
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
 
<script>
var map
import scenicNum from './scenicNum' // 景区数量
import echartTotal from './echartTotal' // 近15日游客请客
import typePopularity from './typePopularity' // 类型人气
import typePie from './typePie' // 景区划分
import todayData from './todayData' // 今日数据
import trend from './trend' // 趋势
import { parseTime } from '@/utils'

export default {
  name: 'BigScreen',
  components: { scenicNum, echartTotal, typePopularity, typePie, todayData, trend },
  data() {
    return {
      dateTime: parseTime(new Date()),
      showInfo: false,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      config: {
        data: [
          { name: '周口', value: 55 },
          { name: '南阳', value: 120 },
          { name: '西峡', value: 78 },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          },
          {
            name: '信阳',
            value: 45
          },
          {
            name: '漯河',
            value: 29
          }
        ]
      },
      list: []
    }
  },
  async created() {
    // const res = await this.$api.bigScreen.list()
    // const data = []
    // // 构造数据
    // for (const item of res.list) {
    //   data.push({
    //     geometry: {
    //       type: 'Point',
    //       coordinates: [item.lng, item.lat]
    //     },
    //     count: 10 * Math.random()
    //   })
    // }
    // const dataSet = new mapv.DataSet(data)
    // const options = {
    //   size: 13,
    //   gradient: { 0.25: 'rgb(0,0,255)', 0.55: 'rgb(0,255,0)', 0.85: 'yellow', 1.0: 'rgb(255,0,0)' },
    //   max: 100,
    //   // range: [0, 100], // 过滤显示数据范围
    //   // minOpacity: 0.5, // 热力图透明度
    //   // maxOpacity: 1,
    //   draw: 'heatmap',
    //   methods: {
    //     click: function (item) {
    //       console.log(item)
    //     }
    //   }
    // }
    // var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options)
  },
  mounted() {
    setInterval(() => {
      this.dateTime = parseTime(new Date())
    }, 1000)
    // console.log('mapv', mapv)
    const _this = this
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
    var randomCount = 2000
    var data = []

    var citys = [
      '北京',
      '天津',
      '上海',
      '重庆',
      '石家庄',
      '太原',
      '呼和浩特',
      '哈尔滨',
      '长春',
      '沈阳',
      '济南',
      '南京',
      '合肥',
      '杭州',
      '南昌',
      '福州',
      '郑州',
      '武汉',
      '长沙',
      '广州',
      '南宁',
      '西安',
      '银川',
      '兰州',
      '西宁',
      '乌鲁木齐',
      '成都',
      '贵阳',
      '昆明',
      '拉萨',
      '海口'
    ]

    // 构造数据
    while (randomCount--) {
      const cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)])
      data.push({
        geometry: {
          type: 'Point',
          coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
        },
        count: 30 * Math.random()
      })
    }

    var dataSet = new mapv.DataSet(data)

    var options = {
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
          _this.click1()
        }
      }
    }

    var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options)
  },
  computed: {},
  methods: {
    click1() {
      this.showInfo = true
      const times = setTimeout(() => {
        this.showInfo = false
        clearTimeout(times)
      }, 4000)
      console.log(this.showInfo)
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
      width: 200px;
      height: 100px;
      background-color: rgb(255, 255, 255);
      border-radius: 10px;
      position: relative;
      top: 50%;
      color: #000;
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
