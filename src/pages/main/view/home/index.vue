<!--
 * @Author: linzq
 * @Date: 2020-11-25 14:32:29
 * @LastEditors: linzq
 * @LastEditTime: 2021-04-01 10:18:23
 * @Description: 
-->
/**
 * @Author: 林中奇
 * @Date: 2020/07/06
 * @lastAuthor:
 * @lastChangeDate:
 * @Explain: 首页
 * @ChildComponents:
 */
<template>
  <div>
    <!-- <router-link to="/home/home">Home</router-link> -->
    首页
    <el-button @click="click">点击</el-button>
  </div>
</template>

<script>
import base_url from '@/config'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {}
  },
  //监听属性 类似于data概念
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  //方法集合
  methods: {
    async click() {
      await this.$api.common.serveTest()
    }
  }
}
</script>
<style lang='less' scoped>
// @import url();
</style>