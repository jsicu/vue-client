
<template>
  <div class="base-wrap">
    <div class="content">
      <div class="base-title">菜单管理</div>
      <search show-export showAdd :data="searchData" @search-reset="reset" @search-submit="searchSubmit"
        @add="() =>{dialogVisible = true}" />
      <com-table :columns="columns" :data="listData" :loading="loading">
        <template slot="total" slot-scope="{row}">
          <div v-for="(item, index) in row.funDescription" :key="index">
            <svg-icon v-if="row.completedIds.includes(String(index))" :icon-class="'success'" />
            {{item}}
          </div>
        </template>
      </com-table>
      <el-pagination v-if="listData.length !== 0" :current-page.sync="defaultParams.pageNum" :page-sizes="pageSizes"
        :page-size="defaultParams.pageSize" class="com-table-pagination" layout="total, sizes, prev, pager, next, jumper"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <el-dialog title="新增菜单" :visible.sync="dialogVisible" :close-on-click-modal="false" width="25%"
      @close="closeDialog('ruleForm')">
      <el-form ref="ruleForm" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="菜单id">
          <el-input v-model="form.description" placeholder="一级菜单: 1xx00；二级: 1xxxx" style="width: 90%" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="status"></el-switch>
        </el-form-item>
        <el-form-item label="是否一级菜单">
          <el-switch v-model="isFirstLevel"></el-switch>
        </el-form-item>
        <el-form-item v-if="isFirstLevel" label="父级菜单">
          <el-select v-model="form.status" style="width: 90%">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="form.description" style="width: 90%" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单地址">
          <el-input v-model="form.description" style="width: 90%" placeholder="一级菜单: /菜单地址；二级: 菜单地址" />
        </el-form-item>
        <el-form-item label="菜单介绍">
          <el-input v-model="form.description" type="textarea" placeholder="请输入菜单简介" style="width: 90%" />
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
import tableMixins from '@mixins/table-mixins'
import { deepClone } from '@/utils'

export default {
  name: 'Route',
  components: {},
  mixins: [tableMixins],
  data() {
    return {
      options: [
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 3, value: 3 }
      ],
      columns: [
        { key: 'edition', title: '菜单id' },
        { key: 'status', title: '菜单名称' },
        { key: 'type', title: '菜单地址' },
        { key: 'description', title: '是否启用' },
        { key: 'total', title: '创建时间', slot: true },
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
                      click: () => {}
                    }
                  })
                ]
              ),
              h(
                'el-tooltip',
                {
                  props: {
                    content: '删除',
                    placement: 'top'
                  }
                },
                [
                  h('el-button', {
                    props: {
                      icon: 'el-icon-delete',
                      type: 'primary',
                      size: 'mini',
                      circle: true
                    },
                    on: {
                      click: () => {
                        this.delOne({ id: params.id })
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
          field: 'description',
          label: '菜单id',
          placeholder: '请输入功能简述或关键字',
          clearable: true
        },
        {
          type: 'input',
          field: 'description',
          label: '菜单地址',
          placeholder: '请输入功能简述或关键字',
          clearable: true
        },
        {
          type: 'select',
          field: 'status',
          label: '是否启用',
          placeholder: '请选择状态名称',
          clearable: true,
          options: [{ label: 1, value: 1 }]
        }
      ],
      dialogVisible: false,
      status: false, // 路由是否启用
      isFirstLevel: false,
      form: {},
      rules: {}
    }
  },
  filters: {},
  // 监听属性 类似于data概念
  computed: {},
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
          // 修改新增同一个接口
          // const res = await this.$api.schedule.newTask(formData)
          // console.log(res)
          this.dialogVisible = false
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