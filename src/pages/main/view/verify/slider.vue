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
    <verifySlider type="1" @success="success" @error="error" />
    <!-- <verifyCode @success="success" @error="error" /> -->
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    <el-button type="text" @click="click">点击打开验证</el-button>

    <!-- <Verify
      :captchaType="'blockPuzzle'"
      :imgSize="{ width: '400px', height: '200px' }"
      :visible.sync="visible"
      @success="success"
    /> -->

    <verify
      captchaType="graphicCode"
      :visible.sync="visible"
      @success="success"
      @error="error"
    />
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <verifySlider type="2" @success="success" @error="error" />
    </el-dialog>
  </div>
</template>

<script>
import verifySlider from '@components/Verify/slider'
import verifyCode from '@components/Verify/code'
import verify from '@components/Verify'
export default {
  name: '',
  //import引入的组件需要注入到对象中才能使用
  components: { verifySlider, verify, verifyCode },
  data() {
    return {
      dialogVisible: false,
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
    success(data) {
      console.log(data)
      // this.dialogVisible = false
      this.visible = false
    },
    error(data) {
      console.log(data)
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
