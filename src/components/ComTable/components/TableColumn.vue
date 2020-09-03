<template>
  <el-table-column
    :key="child[child.key]"
    :show-overflow-tooltip="showOverflowTooltip"
    :prop="child.key"
    :label="child.title"
    :width="child.width"
    :min-width="child.minWidth"
    :fixed="child.fixed"
    :align="child.align"
  >
    <template v-for="item in child.children">
      <table-column
        v-if="item.children && item.children.length"
        :key="item[item.key]"
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
          <table-slot
            v-if="item.slot"
            :row="scope.row"
            :column="item"
            :index="scope.$index"
          />

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
            <span v-else>
              {{ scope.row[item.key] }}
            </span>
          </div>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>

<script>
import TableItem from './TableItem'
import TableSlot from './Slot'
export default {
  name: 'TableColumn',
  inject: ['tableRoot'],
  components: {
    TableItem,
    TableSlot
  },
  props: {
    child: {
      type: Object,
      required: true
    },
    // 是否允许使用tooltip
    showOverflowTooltip: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isEdit: false, // 是否显示编辑框
      editValue: '', // 编辑框的值
      editIndex: -1, // 编辑框的索引值
      editKey: '' // 需要编辑的字段
    }
  },
  methods: {
    // 双击
    tableDbClick(row, key, index) {
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
    hideInput(row, key, index) {
      this.editIndex = -1
      this.editKey = ''
      const params = {
        key: key,
        index: index,
        newValue: this.editValue
      }
      this.tableRoot.editColumn(params)
    }
  }
}
</script>

<style>
</style>
