<template>
  <el-table
    :ref="refName"
    v-loading="loading"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-text="elementLoadingText"
    :element-loading-background="elementLoadingBackground"
    :stripe="stripe"
    :border="border"
    :show-header="showHeader"
    :show-summary="showSummary"
    :summary-method="summaryMethod"
    :highlight-current-row="highlightCurrentRow"
    :selection="selection"
    :data="data"
    :height="height"
    :max-height="maxHeight"
    :size="size"
    :row-key="rowKey"
    :current-row-key="currentRowKey"
    :row-class-name="rowClassName"
    :row-style="rowStyle"
    :cell-class-name="cellClassName"
    :cell-style="cellStyle"
    :header-row-class-name="headerRowClassName"
    :header-row-style="headerRowStyle"
    :header-cell-class-name="headerCellClassName"
    :header-cell-style="headerCellStyle"
    :empty-text="emptyText"
    :default-expand-all="defaultExpandAll"
    :expand-row-keys="expandRowKeys"
    :default-sort="defaultSort"
    :tooltip-effect="tooltipEffect"
    :sum-text="sumText"
    :span-method="spanMethod"
    :select-on-indeterminate="selectOnIndeterminate"
    :indent="indent"
    :lazy="lazy"
    :load="load"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    @selection-change="handleSelectionChange"
    @current-change="handleCurrentChange"
    @select="select"
    @select-all="selectAll"
    @cell-mouse-enter="cellMouseEnter"
    @cell-mouse-leave="cellMouseLeave"
    @cell-click="cellClick"
    @cell-dblclick="cellDblclick"
    @row-click="rowClick"
    @row-contextmenu="rowContextmenu"
    @row-dblclick="rowDblclick"
    @header-click="headerClick"
    @header-contextmenu="headerContextmenu"
    @sort-change="sortChange"
    @filter-change="filterChange"
    @header-dragend="headerDragend"
    @expand-change="expandChange"
  >
    <el-table-column
      v-if="selection"
      type="selection"
      :selectable="isSelectable"
      :reserve-selection="reserveSelection"
      :width="selectionWidth + 'px'"
    />
    <el-table-column v-if="index" type="index"       >
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
        :align="item.align"
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
    loading: {
      type: Boolean,
      default: false
    },
    // Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
    height: {
      type: String | Number,
      default: null
    },
    // Table 的最大高度。合法的值为数字或者单位为 px 的高度。
    maxHeight: {
      type: String | Number,
      default: null
    },
    // 表格尺寸
    size: {
      type: String,
      default: ''
    },
    // 列是否自动撑开
    fit: {
      type: Boolean,
      default: true
    },
    // loading样式
    elementLoadingSpinner: {
      type: String,
      default: ''
    },
    // loading文字提示
    elementLoadingText: {
      type: String,
      default: ''
    },
    // loading背景颜色
    elementLoadingBackground: {
      type: String,
      default: ''
    },
    // 组件名称
    refName: {
      type: String,
      default: 'table'
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true
    },
    // 是否斑马纹
    stripe: {
      type: Boolean,
      default: false
    },
    // 是否边框
    border: {
      type: Boolean,
      default: true
    },
    // 是否高亮当前行
    highlightCurrentRow: {
      type: Boolean,
      default: false
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
    // 当前行的 key，只写属性
    currentRowKey: {
      type: String | Number,
      default: null
    },
    // 表格数据
    data: {
      type: Array,
      default: () => []
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
    // 渲染树形数据时，必须要指定 row-key
    rowKey: {
      type: String,
      default: undefined
    },
    // 全选的宽度
    selectionWidth: {
      type: Number,
      default: 40
    },
    // 是否进行统计
    showSummary: {
      type: Boolean,
      default: false
    },
    // 自定义合计方法
    summaryMethod: {
      type: Function,
      default: null
    },
    // 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
    rowClassName: {
      type: Function | Object,
      default: null
    },
    // 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
    rowStyle: {
      type: Function | Object,
      default: null
    },
    // 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
    cellClassName: {
      type: Function | String,
      default: null
    },
    // 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
    cellStyle: {
      type: Function | Object,
      default: null
    },
    // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
    headerRowClassName: {
      type: Function | String,
      default: null
    },
    // 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
    headerRowStyle: {
      type: Function | Object,
      default: null
    },
    // 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
    headerCellClassName: {
      type: Function | String,
      default: null
    },
    // 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
    headerCellStyle: {
      type: Function | Object,
      default: null
    },
    // 空数据时显示的文本内容，也可以通过 slot="empty" 设置
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    // 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    // 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
    expandRowKeys: {
      type: Array,
      default: undefined
    },
    // 默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序
    defaultSort: {
      type: Object,
      default: () => {
        return {
          prop: '',
          order: ''
        }
      }
    },
    // tooltip effect 属性
    tooltipEffect: {
      type: String,
      default: 'dark'
    },
    // 合计行第一列的文本
    sumText: {
      type: String,
      default: '合计'
    },
    // 合并行或列的计算方法
    spanMethod: {
      type: Function,
      default: null
    },
    // 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行
    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },
    // 展示树形数据时，树节点的缩进
    indent: {
      type: Number,
      default: 16
    },
    // 是否懒加载子节点数据
    lazy: {
      type: Boolean,
      default: null
    },
    // 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息
    load: {
      type: Function,
      default: () => null
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
    console.log(this.data)
  },
  methods: {
    test (a, b) {
      console.log(a, b)
    },
    // 多选
    handleSelectionChange (val) {
      this.$emit('select-cell', val)
    },
    // 单选
    handleCurrentChange (val) {
      this.$emit('change-cell', val)
    },
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
    // 函数式组件发射事件
    editColumn (params) {
      this.$emit('edit-column', params)
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
    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    select (selection, row) {
      this.$emit('select', selection, row)
    },
    // 当用户手动勾选全选 Checkbox 时触发的事件
    selectAll (selection) {
      this.$emit('select-all', selection)
    },
    // 当单元格 hover 进入时会触发该事件
    cellMouseEnter (row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event)
    },
    // 当单元格 hover 退出时会触发该事件
    cellMouseLeave (row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event)
    },
    // 当某个单元格被点击时会触发该事件
    cellClick (row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    },
    // 当某个单元格被双击击时会触发该事件
    cellDblclick (row, column, cell, event) {
      this.$emit('cell-dbclick', row, column, cell, event)
    },
    // 当某一行被点击时会触发该事件
    rowClick (row, column, event) {
      this.$emit('row-click', row, column, event)
    },
    // 当某一行被鼠标右键点击时会触发该事件
    rowContextmenu (row, column, event) {
      this.$emit('row-contextmenu', row, column, event)
    },
    // 当某一行被双击时会触发该事件
    rowDblclick (row, column, event) {
      this.$emit('row-dblclick', row, column, event)
    },
    // 当某一列的表头被点击时会触发该事件
    headerClick (column, event) {
      this.$emit('headerc-lick', column, event)
    },
    // 当某一列的表头被鼠标右键点击时触发该事件
    headerContextmenu (column, event) {
      this.$emit('header-contextmenu', column, event)
    },
    // 当表格的排序条件发生变化的时候会触发该事件
    sortChange ({ column, prop, order }) {
      this.$emit('sort-change', { column, prop, order })
    },
    // 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。
    filterChange (filters) {
      this.$emit('filterc-hange', filters)
    },
    // 当拖动表头改变了列的宽度的时候会触发该事件
    headerDragend (newWidth, oldWidth, column, event) {
      this.$emit('header-dragend', newWidth, oldWidth, column, event)
    },
    // 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）
    expandChange (row, type) {
      this.$emit('expand-change', row, type)
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
