<!--
 * @Author: linzq
 * @Date: 2021-03-22 11:41:42
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-25 23:33:10
 * @Description: 景区管理
-->
<template>
  <div class="base-wrap">
    <div class="content">
      <div class="base-title">景区管理</div>
      <com-table :columns="columns" :data="listData" :loading="loading" />
      <el-pagination v-if="listData.length !== 0" :current-page.sync="defaultParams.pageNum" :page-sizes="pageSizes"
        :page-size="defaultParams.pageSize" class="com-table-pagination" layout="total, sizes, prev, pager, next, jumper"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import tableMixins from '@mixins/table-mixins' // 使用person下mixins确保后面能多用几次组件

export default {
  name: 'Scenic',
  components: {},
  mixins: [tableMixins],
  data() {
    return {
      columns: [
        {
          key: 'destName',
          title: '景区名称'
        }
      ]
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  // 方法集合
  methods: {}
}
</script>
<style lang='less' scoped>
// @import url();
</style>