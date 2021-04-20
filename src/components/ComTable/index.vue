<template>
  <el-table
    :ref="refName"
    v-loading="loading"
    :border="border"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-table-column
      v-if="selection"
      type="selection"
      align="center"
      :selectable="isSelectable"
      :reserve-selection="reserveSelection"
      :width="selectionWidth + 'px'"
    />
    <el-table-column v-if="index" type="index" align="center" >
      <template slot-scope="scope">
        <span v-if="indexIsSelfIncreasing">{{(pageIndex - 1) * pageSize + scope.$index + 1}}</span>
        <span v-else>{{scope.$index + 1}}</span>
      </template>
    </el-table-column>
    <template v-for="item in columns">
      <table-column
        v-if="item.children && item.children.length"
        :key="item[item.key]"
        :show-overflow-tooltip="showOverflowTooltip"
        :child="item"
      />

      <el-table-column
        v-else
        :key="item[item.key]"
        :show-overflow-tooltip="showOverflowTooltip"
        :prop="item.key"
        :label="item.title"
        :width="item.width"
        :min-width="item.minWidth"
        :fixed="item.fixed"
        :align="item.align|| 'center'"
      >
        <template slot-scope="scope">
          <table-slot v-if="item.slot" :row="scope.row" :column="item" :index="scope.$index" />

          <div v-else>
            <table-item
              v-if="item.render"
              :render="item.render"
              :row="scope.row"
              :index="scope.$index"
            />
            <span
              v-else-if="item.edit"
              style="display: inline-block; width: 100%;cursor: text;"
              title="双击可编辑"
              @dblclick="tableDbClick(scope.row, item.key, scope.$index)"
            >
              <span v-if="isEdit && editIndex===scope.$index && editKey===item.key">
                <el-input
                  :ref="'input' + item.key + scope.$index"
                  v-model="editValue"
                  style="width: auto;"
                  @blur="hideInput(scope.row, item.key, scope.$index)"
                  @keyup.enter.native="hideInput(scope.row, item.key, scope.$index)"
                />
              </span>
              <span v-else>
                <span>{{ scope.row[item.key] }}</span>
              </span>
            </span>
            <span v-else>{{ scope.row[item.key] }}</span>
          </div>
        </template>
      </el-table-column>
    </template>
    <div slot="empty" style="margin: 20px 0 10px 0;">
      <div class="empty-content">
        <img src="@/assets/img/noneData.png" alt class="nodata" />
        <span style="display: block;font-size: 20px;letter-spacing: 10px;">····暂无数据····</span>
      </div>
    </div>
  </el-table>
</template>

<script>
import Sortable from 'sortablejs'
import TableItem from './components/TableItem'
import TableColumn from './components/TableColumn'
import TableSlot from './components/Slot'
export default {
  components: { TableItem, TableColumn, TableSlot },
  provide () {
    return {
      tableRoot: this
    }
  },
  props: {
    // loading状态
    loading: { //
      type: Boolean,
      default: false
    },
    // 是否边框
    border: {
      type: Boolean,
      default: true,
    },
    // 组件名称
    refName: {
      type: String,
      default: 'table'
    },
    // 是否开启多选
    selection: {
      type: Boolean,
      default: false
    },
    // 是否开启序号
    index: {
      type: Boolean,
      default: true
    },
    // 表格头部
    columns: {
      type: Array,
      default: () => []
    },
    // 是否允许使用tooltip
    showOverflowTooltip: {
      type: Boolean,
      default: true
    },
    // 是否开启拖拽表格
    dragTable: {
      type: Boolean,
      default: false
    },
    // 全选的宽度
    selectionWidth: {
      type: Number,
      default: 40
    },
    // 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）
    reserveSelection: {
      type: Boolean,
      default: false
    },
    // 禁用条件
    selectable: {
      type: Function,
      default: res => true
    },
    // 页面数据容量 - 用于序号自增
    pageSize: {
      type: Number,
    },
    // 页码 - 用于序号自增
    pageIndex: {
      type: Number
    }
  },
  data () {
    return {
      isEdit: false, // 是否显示编辑框
      editValue: '', // 编辑框的值
      editIndex: -1, // 编辑框的索引值
      editKey: '', // 需要编辑的字段
      sortable: null
    }
  },
  created () {
    if (this.dragTable) {
      this.$nextTick(() => {
        this.setSort()
      })
    }
  },
  methods: {
    // 双击
    tableDbClick (row, key, index) {
      this.editIndex = index
      this.editKey = key
      this.isEdit = true
      this.editValue = row[key]
      this.$nextTick(() => {
        const input = this.$refs['input' + key + index][0]
        input.focus()
      })
    },
    // 编辑框离焦
    hideInput (row, key, index) {
      if (row) {
        this.editIndex = -1
        this.editKey = ''
        const params = {
          key: key,
          index: index,
          newValue: this.editValue
        }
        this.$emit('edit-column', params)
      }
    },
    // 实例化拖拽
    setSort () {
      const el = this.$refs[this.refName].$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function (dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onStart: () => {
          this.hideInput()
        },
        onEnd: evt => {
          this.$emit('drag-end', evt)
        }
      })
    },
    // 用于多选表格，清空用户的选择
    clearSelection () {
      this.$refs[this.refName].clearSelection()
    },
    // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
    toggleRowSelection (row, selected) {
      this.$refs[this.refName].toggleRowSelection(row, selected)
    },
    // 用于多选表格，切换所有行的选中状态
    toggleAllSelection () {
      this.$refs[this.refName].toggleAllSelection()
    },
    // 用于可展开表格与树形表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开）
    toggleRowExpansion (row, expanded) {
      this.$refs[this.refName].toggleRowExpansion(row, expanded)
    },
    // 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。
    setCurrentRow (row) {
      this.$refs[this.refName].setCurrentRow(row)
    },
    // 用于清空排序条件，数据会恢复成未排序的状态
    clearSort () {
      this.$refs[this.refName].clearSort()
    },
    // 不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态，也可传入由columnKey组成的数组以清除指定列的过滤条件
    clearFilter (columnKey) {
      this.$refs[this.refName].clearFilter(columnKey)
    },
    // 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
    doLayout () {
      this.$refs[this.refName].doLayout()
    },
    // 手动对 Table 进行排序。参数prop属性指定排序列，order指定排序顺序。
    sort (prop, order) {
      this.$refs[this.refName].sort(prop, order)
    },
    // 是否可选
    isSelectable (row, index) {
      return this.selectable(row, index)
    }
  },
  computed: {
    indexIsSelfIncreasing () {
      return !!this.pageSize && !!this.pageIndex
    }
  }
}
</script>

<style lang="less" scoped>
.table-icon-item {
  position: absolute;
  font-size: 16px;
  color: #409eff;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  cursor: pointer;
}
.input-icon-item {
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;
}
.input-icon-sure {
  color: @green;
}
.input-icon-close {
  color: @red;
}
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>
