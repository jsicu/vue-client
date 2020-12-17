/**
 * @Author: 林中奇
 * @Date: 2020/12/16
 * @lastAuthor:
 * @lastChangeDate:
 * @Explain: 点击验证
 * @ChildComponents:
 */
<template>
  <div>
    <verifyPoint />
  </div>
</template>

<script>
import verifyPoint from '@components/Verify/point'
export default {
  name: '',
  //import引入的组件需要注入到对象中才能使用
  components: { verifyPoint },
  data() {

    
    return {}
  },
  //监听属性 类似于data概念
  computed: {},
  watch: {},
  //方法集合
  methods: {},
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
<style lang='less' scoped>
// @import url();
</style>