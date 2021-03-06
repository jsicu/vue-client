<!--
 * @Author: linzq
 * @Date: 2021-03-03 13:46:02
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-06 16:15:01
 * @Description: 今日数据
-->
<template>
  <div class='grid'>
    <div>今日总客流
      <div class="data">{{form.todayTourists}}</div>
    </div>
    <div>在园总数
      <div class="data">{{form.tourists}}</div>
    </div>
    <div>平均游玩时间
      <div class="data">{{form.playTime}}</div>
    </div>
    <div>平均在园人数
      <div class="data">{{form.touristsAvg}}</div>
    </div>
    <div>最多今日客流
      <div class="data">{{form.maxTodayTourists}}</div>
    </div>
    <div>最少今日客流
      <div class="data">{{form.minTodayTourists}}</div>
    </div>
    <div>最高游玩时间
      <div class="data">{{form.maxPlayTime}}</div>
    </div>
    <div>最多在园人数
      <div class="data">{{form.maxTourists}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodayData',
  components: {},
  data() {
    return {
      form: {}
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  watch: {},
  created() {
    this.getData()
  },
  mounted() {},
  // 方法集合
  methods: {
    async getData() {
      const res = await this.$api.bigScreen.realData()
      this.form = res
      this.form.playTime = Math.floor(res.playTime / 60) + '小时' + (res.playTime % 60) + '分钟'
      this.form.maxPlayTime = Math.floor(res.maxPlayTime / 60) + '小时' + (res.maxPlayTime % 60) + '分钟'
    }
  }
}
</script>
<style lang='less' scoped>
// @import url();
.grid {
  margin: 10px;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: auto auto;
  height: calc(100% - 60px);
  grid-gap: 5px;
  color: #eee;
  .data {
    margin: 12px 0;
    font-size: 19px;
    font-weight: 700;
    color: red;
  }
}
</style>