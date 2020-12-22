<!--
/** 
 * @Author: 林中奇 
 * @Date: 2020/12/16 
 * @lastAuthor: 
 * @lastChangeDate: 
 * @Explain: 点击验证 
 * @ChildComponents: 
 */ -->
<template>
  <div style="margin: 10px">
    <Verify
      @success="success"
      @ready="ready"
      @error="error"
      :visible="visible"
      :captchaType="'clickWord'"
      :imgSize="{ width: '330px', height: '155px' }"
    />
    <el-button type="text" @click="click">点击打开验证</el-button>

    <!-- <verifyPoint @success="success" @ready="ready" @error="error" /> -->
  </div>
</template>

<script>
import Verify from '@components/Verify'
import verifyPoint from '@components/Verify/point'

export default {
  name: '',
  //import引入的组件需要注入到对象中才能使用
  components: { verifyPoint, Verify },
  data() {
    return {
      visible: false
    }
  },
  //监听属性 类似于data概念
  computed: {},
  watch: {},
  //方法集合
  methods: {
    click() {
      this.visible = true
    },
    ready(data) {
      console.log('ready')
    },
    success(data) {
      console.log('success')
    },
    error(data) {
      console.log('error')
    }
  },
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
}
</script>
<style lang="less" scoped>
// @import url();
</style>
