<!--
 * @Author: linzq
 * @Date: 2021-03-22 11:41:42
 * @LastEditors: linzq
 * @LastEditTime: 2021-05-31 21:03:10
 * @Description: 景区管理
-->
<template>
  <div class="base-wrap">
    <div class="content">
      <div class="base-title">景区管理</div>
      <search show-export showAdd :data="searchData" @search-reset="reset" @search-submit="searchSubmit"
        @add="() =>{dialogVisible = true}" />
      <com-table :columns="columns" :data="listData" :loading="loading">
        <template slot="type" slot-scope="{row}">
          <div>{{row.type | capitalize}}</div>
        </template>
      </com-table>
      <el-pagination v-if="listData.length !== 0" :current-page.sync="defaultParams.pageNum" :page-sizes="pageSizes"
        :page-size="defaultParams.pageSize" class="com-table-pagination" layout="total, sizes, prev, pager, next, jumper"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <el-dialog title="新增" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%"
      @close="closeDialog('ruleForm')">
      <el-form ref="ruleForm" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="景区名称">
          <el-input v-model="form.destName" style="width: 80%">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
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
        { key: 'destName', title: '景区名称' },
        { key: 'address', title: '景区地址' },
        { key: 'ranking', title: '排名' },
        { key: 'score', title: '评分' },
        { key: 'type', title: '类型', slot: true },
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
                    content: '查看详情',
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
          field: 'destName',
          label: '景区名称',
          placeholder: '请输入景区名称',
          clearable: true
        },
        {
          type: 'select',
          field: 'type',
          label: '景区类型',
          placeholder: '请选择景区类型',
          clearable: true,
          options: this.$store.getters['1'] || []
        }
      ],
      form: {}
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
  mounted() {},
  // 方法集合
  methods: {
    // 新增弹窗关闭
    closeDialog(formName) {
      this.dialogVisible = false
      this.form = {}
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          console.log(this.form)
          // 修改新增同一个接口
          const res = await this.$api.bigScreen.newDest(this.form)
          console.log(res)
          // this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
// @import url();
</style>