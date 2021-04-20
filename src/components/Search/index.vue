<template>
  <div class="search-wrap">
    <el-form
      ref="ruleForm"
      :inline="inline"
      :model="formInline"
      :label-position="labelPosition"
      :label-width="labelWidth"
      :label-suffix="labelSuffix"
      :hide-required-asterisk="hideRequiredAsterisk"
      :inline-message="inlineMessage"
      :status-icon="statusIcon"
      :validate-on-rule-change="validateOnRuleChange"
      :size="size"
      :disabled="disabled"
      @submit.native.prevent
    >
      <el-form-item
        v-for="(item, $index) in data"
        :key="$index"
        :label="item.label"
        :prop="item.field"
        :rules="item.rules"
      >
        <el-input
          v-if="item.type === 'input'"
          v-model="formInline[item.field]"
          :placeholder="item.placeholder"
          :clearable="item.clearable"
          @change="((val) => {changeVal(val, item)})"
        />

        <el-select
          v-if="item.type === 'select'"
          v-model="formInline[item.field]"
          :placeholder="item.placeholder"
          :clearable="item.clearable"
          :filterable="item.filterable"
          @change="((val) => {changeVal(val, item)})"
        >
          <template v-if="typeof item.options ==='string'">
            <el-option
              v-for="citem in $store.getters[item.options]"
              :key="item.optionValue ? citem[item.optionValue] : citem.value"
              :label="item.optionLabel ? citem[item.optionLabel] : citem.label"
              :value="item.optionValue ? citem[item.optionValue] : citem.value"
            />
          </template>
          <template v-else>
            <el-option
              v-for="citem in item.options"
              :key="item.optionValue ? citem[item.optionValue] : citem.value"
              :label="item.optionLabel ? citem[item.optionLabel] : citem.label"
              :value="item.optionValue ? citem[item.optionValue] : citem.value"
            />
          </template>
        </el-select>

        <el-switch
          v-if="item.type === 'switch'"
          v-model="formInline[item.field]"
          @change="((val) => {changeVal(val, item)})"
        />

        <el-radio-group
          v-if="item.type === 'radio'"
          v-model="formInline[item.field]"
          @change="((val) => {changeVal(val, item)})"
        >
          <el-radio
            v-for="citem in item.options"
            :key="item.optionValue ? citem[item.optionValue] : citem.value"
            :label="item.optionValue ? citem[item.optionValue] : citem.value"
          >{{ item.optionLabel ? citem[item.optionLabel] : citem.label }}</el-radio>
        </el-radio-group>

        <el-date-picker
          v-if="item.type === 'daterange'"
          v-model="formInline[item.field]"
          type="daterange"
          :value-format="item.valueFormat"
          :format="item.format"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="((val) => {changeVal(val, item)})"
        />

        <el-date-picker
          v-if="item.type === 'datetimerange'"
          v-model="formInline[item.field]"
          type="datetimerange"
          :value-format="item.valueFormat"
          :format="item.format"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="((val) => {changeVal(val, item)})"
        />
      </el-form-item>
      <el-form-item v-show="data.length > 0">
        <el-button
          icon="el-icon-search"
          type="primary"
          class="ct-btn-search"
          @click="submitForm('ruleForm')"
        >查询</el-button>
        <el-button
          v-if="showReset"
          class="ct-btn-reset"
          icon="el-icon-refresh"
          @click="resetForm('ruleForm')"
        >重置</el-button>
        <el-button
          v-if="showAdd"
          icon="el-icon-circle-plus-outline"
          class="ct-btn-add"
          @click="add"
        >新增</el-button>
        <el-button
          v-if="showExcel"
          v-permission="'dels'"
          icon="el-icon-download"
          class="btn-defs"
          @click="getExcel"
        >生成Excel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
export default {
  name: 'Search',
  props: {
    // 需要渲染的数据
    data: {
      type: Array,
      default: () => []
    },
    // 表单展示的风格
    inline: {
      type: Boolean,
      default: true
    },
    // 表单域标签的位置
    labelPosition: {
      type: String,
      default: 'right'
    },
    // 表单域标签的宽度
    labelWidth: {
      type: String,
      default: ''
    },
    // 表单域标签的后缀
    labelSuffix: {
      type: String,
      default: ''
    },
    // 是否显示必填字段的标签旁边的红色星号
    hideRequiredAsterisk: {
      type: Boolean,
      default: true
    },
    // 是否显示校验错误信息
    showMessage: {
      type: Boolean,
      default: true
    },
    // 是否以行内形式展示校验信息
    inlineMessage: {
      type: Boolean,
      default: false
    },
    // 是否在输入框中显示校验结果反馈图标
    statusIcon: {
      type: Boolean,
      default: false
    },
    // 是否在 rules 属性改变后立即触发一次验证
    validateOnRuleChange: {
      type: Boolean,
      default: true
    },
    // 用于控制该表单内组件的尺寸
    size: {
      type: String,
      default: ''
    },
    // 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否显示重置按钮
    showReset: {
      type: Boolean,
      default: true
    },
    // 是否显示重置按钮
    showExcel: {
      type: Boolean,
      default: false
    },
    // 是否显示新增按钮
    showAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formInline: {} // 表单数据
    }
  },
  watch: {
    data: {
      handler(newData, oldData) {
        this.initForm()
      },
      immediate: true,
      deep: true
    }
  },
  mounted() { },
  methods: {
    initForm() {
      for (const item of this.data) {
        if (this.formInline.hasOwnProperty(item.field)) {
          if ((item.value || item.value === 0) && item.value.length > 0) {
            this.$set(
              this.formInline,
              item.field,
              item.newValue
                ? item.newValue
                : this.formInline[item.field] || item.value
            )
          }
        } else {
          this.$set(
            this.formInline,
            item.field,
            this.formInline[item.field] || item.value
          )
        }
      }
    },
    submitForm(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const params = this.filterData()
          this.$emit('search-submit', params)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      const params = this.filterData()
      this.$emit('search-reset', params)
    },
    add() {
      this.$emit('add')
    },
    filterData() {
      const params = deepClone(this.formInline)
      this.data.forEach((v, i) => {
        if (v.fieldStart && v.fieldEnd) {
          params[v.fieldStart] =
            this.formInline[v.field] && this.formInline[v.field][0]
              ? this.formInline[v.field][0]
              : ''
          params[v.fieldEnd] =
            this.formInline[v.field] && this.formInline[v.field][1]
              ? this.formInline[v.field][1]
              : ''
          if (v.dateFormat) {
            params[v.fieldStart] = this.formateDate(params[v.fieldStart])
            params[v.fieldEnd] = this.formateDate(params[v.fieldEnd])
          }
          delete params[v.field]
        }
      })
      return params
    },
    getExcel() {
      const params = this.filterData()
      this.$emit('get-excel', params)
    },
    changeVal(val, item) {
      this.$emit(`${item.field}Change`, val)
    },
    formateDate(timeStamp) {
      if (!timeStamp) return ''
      const date = new Date(timeStamp)
      const month = this.editTime(date.getMonth() + 1)
      const day = this.editTime(date.getDate())
      return date.getFullYear() + '-' + month + '-' + day
    },
    editTime(time) {
      if (time < 10) {
        return '0' + time
      } else {
        return time
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-wrap {
  background-color: @content-bg;
  padding: 0px 20px 0 20px;
  /deep/.el-form-item {
    margin-bottom: 10px;
  }
}
</style>
