<!--
 * @Author: linzq
 * @Date: 2021-05-20 16:22:07
 * @LastEditors: linzq
 * @LastEditTime: 2021-05-30 16:16:36
 * @Description: 任务看板管理页面
-->
<template>
  <div class="base-wrap">
    <div class="content">
      <div class="base-title">开发任务管理</div>
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
    <el-dialog title="新增需求" :visible.sync="dialogVisible" :close-on-click-modal="false" width="40%"
      @close="closeDialog('ruleForm')">
      <el-form ref="ruleForm" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="版本">
          <el-select v-model="form.edition" style="width: 80%">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" style="width: 80%">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" style="width: 80%">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能简述">
          <el-input v-model="form.description" style="width: 80%"></el-input>
          <!-- <el-input v-model="form.imgName"></el-input> -->
        </el-form-item>
        <el-form-item label="功能明细">
          <el-checkbox-group v-if="form.oldFunDescription.length > 0" v-model="form.checkList">
            <div v-for="(item, index) in form.oldFunDescription" :key="index">
              <el-checkbox :label="item">{{item}}</el-checkbox>
              <el-button
                v-if="index + 1 === form.oldFunDescription.length && !newCheckbox && form.oldFunDescription.length !== 10"
                type="text" icon="el-icon-circle-plus" circle @click="()=>{newCheckbox = true}"></el-button>
            </div>
          </el-checkbox-group>
          <div v-if="form.oldFunDescription.length === 0 || newCheckbox">
            <el-checkbox v-model="newFunDescribe.checked">{{ }}</el-checkbox>
            <el-input v-model="newFunDescribe.label" size="mini" maxlength="30" style="width: 76%"
              @keydown.enter.native="newFun(true)" />
            <el-button type="text" icon="el-icon-check" circle @click="newFun(true)"></el-button>
            <el-button type="text" icon="el-icon-delete" circle @click="newFun(false)"></el-button>
          </div>
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
  name: 'Schedule',
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
        { key: 'edition', title: '所属版本' },
        { key: 'status', title: '状态' },
        { key: 'type', title: '类型' },
        { key: 'description', title: '需求简述' },
        { key: 'total', title: '总功能数', slot: true },
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
                        let selected = []
                        for (let i = 0; i < params.funDescription.length; i++) {
                          if (params.completedIds.includes(String(i))) {
                            selected.push(params.funDescription[i])
                          }
                        }
                        this.form = params
                        this.form.oldFunDescription = deepClone(params.funDescription)
                        this.form.checkList = selected
                        this.dialogVisible = true
                      }
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
          label: '需求简述',
          placeholder: '请输入功能简述或关键字',
          clearable: true
        },
        {
          type: 'select',
          field: 'edition',
          label: '所属版本',
          placeholder: '请选择所属版本',
          clearable: true,
          options: [{ label: 1, value: 1 }]
        },
        {
          type: 'select',
          field: 'status',
          label: '状态',
          placeholder: '请选择状态名称',
          clearable: true,
          options: [{ label: 1, value: 1 }]
        },
        {
          type: 'select',
          field: 'type',
          label: '类型',
          placeholder: '请选择状态',
          clearable: true,
          options: [{ label: 1, value: 1 }]
        }
      ],
      dialogVisible: false,
      newCheckbox: false,
      newFunDescribe: {
        checked: false,
        label: ''
      },
      form: {
        checkList: [],
        oldFunDescription: [],
        description: ''
      },
      rules: {}
    }
  },
  filters: {},
  // 监听属性 类似于data概念
  computed: {},
  watch: {},
  created() {},
  mounted() {
  },
  // 方法集合
  methods: {
    // 新功能
    newFun(type) {
      if (type) {
        if (this.newFunDescribe.label === '') return this.$message.warning('功能说明不得为空')
        if (this.form.oldFunDescription.includes(this.newFunDescribe.label))
          return this.$message.warning('该功能已存在，请重新编辑')

        this.form.oldFunDescription.push(this.newFunDescribe.label)
        if (this.newFunDescribe.checked) this.form.checkList.push(this.newFunDescribe.label)
        if (this.form.oldFunDescription.length === 1) this.newCheckbox = true // 当新增一条后会关闭新增输入框
        if (this.form.oldFunDescription.length === 10) {
          this.newCheckbox = false
          return this.$message.warning('一个需求最多填写10个功能')
        }
      } else {
        this.newCheckbox = false
      }
      this.newFunDescribe = {
        checked: false,
        label: ''
      }
    },
    // 新增弹窗关闭
    closeDialog(formName) {
      this.dialogVisible = false
      this.form = {
        checkList: [],
        oldFunDescription: []
      }
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let completedIds = []
          for (const key in this.form.oldFunDescription) {
            if (this.form.checkList.includes(this.form.oldFunDescription[key])) completedIds.push(key)
          }
          this.form.completedIds = completedIds
          console.log(this.form)
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