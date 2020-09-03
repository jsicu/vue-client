/**
 * @Author: 林中奇
 * @Date: 2020/07/10
 * @lastAuthor:
 * @lastChangeDate:
 * @Explain: ceshi
 * @ChildComponents:
 */
<template>
  <div class>
    <!-- <div class="com-table-wrap"> -->
      <comTable :columns="columns" :data="listData" :loading="loading" />
    <!-- </div> -->
  </div>
</template>

<script>
import tableMixins from '@/mixins/table-mixins'
export default {
  //import引入的组件需要注入到对象中才能使用
  mixins: [tableMixins],
  data() {
    return {
      columns: [
        { key: 'code', title: '项目编号' },
        { key: 'name', title: '项目名称' }
      ]
    }
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