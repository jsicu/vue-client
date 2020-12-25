<!--
  /**
   * @Author: 林中奇
   * @Date: 2020/12/25
   * @lastAuthor:
   * @lastChangeDate:
   * @description:
   * @ChildComponents:
   */ -->
<template>
  <div style="margin: 100px">
    <el-button type="text" @click="visible = true">点击打开验证</el-button>
    <verify
      :visible="visible"
      @success="success"
      @error="error"
      @ready="ready"
      @close="visible = false"
    />
  </div>
</template>

<script>
import verify from '@components/Verify'

export default {
  name: 'Verify',
  //import引入的组件需要注入到对象中才能使用
  components: { verify },
  data() {
    return {
      visible: false
    }
  },
  watch: {},
  //方法集合
  methods: {
    success(data) {
      this.$message('验证成功！')
      this.visible = false
    },
    error(data) {
      console.log('验证失败')
    },
    ready() {
      console.log('ready')
    }
  }
}
</script>