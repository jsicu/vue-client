<!--
 * @Author: linzq
 * @Date: 2021-03-03 13:46:02
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-03 15:27:53
 * @Description: 今日数据
-->
<template>
  <div class='grid'>
    <div>今日客流</div>
    <div>在园人数</div>
    <div>拥挤程度</div>
    <div>平均游玩时间</div>
    <div>今日客流</div>
    <div>在园人数</div>
    <div>拥挤程度</div>
    <div>平均游玩时间</div>
  </div>
</template>

<script>
export default {
  name: 'TodayData',
  components: {},
  data() {
    return {}
  },
  // 监听属性 类似于data概念
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  // 方法集合
  methods: {}
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
}
</style>