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
    dasda
    <img :src="base_url" />
    <el-button type="primary" @click="click">按钮</el-button>
  </div>
</template>

<script>
import base_url from '@/config'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {
      base_url: `${base_url.base_url.dev}image/download/1?token=${this.$wsCache.get('userInfo').token}`
    }
  },
  //监听属性 类似于data概念
  computed: {},
  watch: {},
  created() {
    console.log(base_url)
  },
  mounted() {},
  //方法集合
  methods: {
    async click() {
      const res = await this.$api.login.navigation()
      console.log(res)
    }
  }
}
</script>
<style lang='less' scoped>
// @import url();
</style>