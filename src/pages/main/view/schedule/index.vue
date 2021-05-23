<!--
 * @Author: linzq
 * @Date: 2021-05-20 16:22:07
 * @LastEditors: linzq
 * @LastEditTime: 2021-05-20 17:01:03
 * @Description: 任务管理
-->
<template>
  <div class="base-wrap">
    <div class="content">
      <div class="base-title">开发任务管理</div>
      <search show-export :data="searchData" @search-reset="reset" @search-submit="searchSubmit" />
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
  name: 'Schedule',
  components: {},
  mixins: [tableMixins],
  data() {
    return {
      columns: [
        { key: 'destName', title: '所属版本' },
        { key: 'address', title: '状态' },
        { key: 'ranking', title: '类型' },
        { key: 'score', title: '功能简述' },
        { key: 'score', title: '已完成功能数' },
        { key: 'score', title: '总功能数' },
        {
          title: '操作',
          key: 'action',
          width: '200px',
          render: (h, params, index) => {
            return h('div', [
              h(
                'el-tooltip',
                {
                  props: {
                    content: '详情',
                    placement: 'top'
                  }
                },
                [
                  h('el-button', {
                    props: {
                      icon: 'el-icon-search',
                      type: 'primary',
                      size: 'mini',
                      circle: true
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          path: '/regUnit/unitDetail',
                          query: { id: params.unitId }
                        })
                      }
                    }
                  })
                ]
              )
            ])
          }
        }
      ],
      searchData: [
        {
          type: 'input',
          field: 'describe',
          label: '功能简述',
          placeholder: '请输入功能简述或关键字',
          clearable: true
        },
        {
          type: 'select',
          field: 'edition',
          label: '所属版本',
          placeholder: '请选择所属版本',
          clearable: true
        },
        {
          type: 'select',
          field: 'status',
          label: '状态',
          placeholder: '请选择状态名称',
          clearable: true,
          options: []
        },
        {
          type: 'select',
          field: 'type',
          label: '类型',
          placeholder: '请选择状态',
          clearable: true,
          options: []
        }
      ]
    }
  },
  filters: {
    capitalize: function (value) {
      switch (value) {
        case 0:
          return '植物园'
          break
        case 1:
          return '文博院馆'
          break
        case 2:
          return '寺庙观堂'
          break
        case 3:
          return '旅游度假区'
          break
        case 4:
          return '自然保护区'
          break
        case 5:
          return '主题公园'
          break
        case 6:
          return '森林公园'
          break
        case 7:
          return '地质公园'
          break
        case 8:
          return '游乐园'
          break
        case 9:
          return '动物园'
          break
        default:
          break
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {
    type() {
      return this.$store.getters['1']
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.$api.schedule.schedule()
  },
  // 方法集合
  methods: {}
}
</script>
<style lang='less' scoped>
// @import url();
</style>