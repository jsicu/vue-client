import Search from '_c/Search'
import ComTable from '_c/ComTable'
import MutiTable from '_c/MutiTable' // 多级表头
import MoreTable from '_c/MoreTable' // 多级表头-齐全
export default {
  components: {
    Search,
    ComTable,
    MutiTable,
    MoreTable
  },
  data() {
    return {
      loading: false, // 加载loading
      delLoading: false, // 删除loading
      putAwayLoading: false, // 上架loading
      soldOutLoading: false, // 下架loading
      moveUpLoading: false, // 上移loading
      moveDownLoading: false, // 下移loading
      listData: [], // 表格数据
      total: 0, // 总条数
      defalutParams: {
        pageNum: 1,
        pageSize: 10
      },
      dialogType: '', // 弹窗类型
      dialogTitle: '', // 弹窗标题
      dialogVisible: false, // 是否显示弹窗
      dialogComponent: '', // 组件名称
      multipleSelection: [], // 表格选中数据
      unid: null, // 列表ID
      filterTime: 'yyyy-MM-dd HH:mm:ss',
      isFullscreen: false, // 是否全屏显示
      hasFullscreenIcon: false // 是否有全屏icon
    }
  },
  created() {
    if (this.beforeGetList) {
      this.beforeGetList()
    } else {
      this.getList()
    }
  },
  computed: {
    isShowDelBtn: function() {
      return (
        JSON.parse(JSON.parse(sessionStorage.getItem('userInfo')).v).type == 1 ||
        JSON.parse(JSON.parse(sessionStorage.getItem('userInfo')).v).is_delete == 1
      )
    },
    isShowSortBtn: function() {
      return JSON.parse(JSON.parse(sessionStorage.getItem('userInfo')).v).type == 1
    }
  },
  methods: {
    // 获取列表数据
    async getList() {
      this.loading = true
      try {
        const res = await this.$api[this.$route.meta.module][this.$route.meta.request.list](Object.assign({}, this.otherParams, this.defalutParams))
        if (res) {
          this.listData = res.list
          this.total = res.total || 0
          if (this.getListAfter) {
            this.getListAfter()
          }
        }
        this.loading = false
      } catch (err) {
        this.loading = false
        throw (err)
      }
    },
    // 查询
    searchSubmit(row) {
      if (this.beforeSearch) {
        this.beforeSearch(row)
      } else {
        this.defalutParams = {
          pageNum: 1,
          pageSize: 10
        }
        this.defalutParams = Object.assign(this.defalutParams, row)
        for (const key in row) {
          if (!row[key]) delete this.defalutParams[key]
        }
        this.defalutParams.pageNum = 1
        this.getList()
      }
    },
    // 分页
    handleCurrentChange(val) {
      this.defalutParams.pageNum = val
      this.getList()
    },
    // 分页
    handleSizeChange(val) {
      this.defalutParams.pageSize = val
      this.getList()
    },
    // 显示弹窗
    showDialog(type, row, component, title) {
      this.proItem = row
      sessionStorage.editorInitVal = true
      this.dialogType = type
      if (title) {
        this.dialogTitle = title
      } else {
        this.dialogTitle = type === 'add' ? '新增' : (type === 'edit' ? '编辑' : (type === 'select' ? '选择应用' : '详情'))
      }
      this.dialogVisible = true
      this.dialogComponent = component || 'Info'
      if (row) {
        this.id = row.id
        this.orgId = row.organizationId
        this.compId = row.companyId
        this.pkId = row.pkId
      } else {
        this.id = null
      }
    },
    // 关闭弹窗
    closeDialog(val) {
      this.dialogVisible = val
    },
    // 更新列表
    getData(type) {
      if (!type) {
        this.defalutParams.pageNum = 1
      }
      this.dialogVisible = false
      this.getList()
    },
    // 重置表单
    reset(row) {
      if (this.beforeReset) {
        this.beforeReset(row)
      } else {
        for (const key in row) {
          if (!row[key]) delete this.defalutParams[key]
        }
        // this.defalutParams = Object.assign(this.defalutParams, row)
        this.defalutParams.pageNum = 1
        delete this.defalutParams.startTime
        delete this.defalutParams.endTime
        this.getList()
      }
    },
    // 批量删除
    delData() {
      if (this.multipleSelection.length === 0) {
        return
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.delLoading = true
        const ids = this.multipleSelection.map(item => {
          return item.id
        }).join(',')
        const res = await this.$api[this.$route.meta.module][this.$route.meta.request.del]({
          ids: ids
        })
        if (res) {
          this.$message.success('删除成功')
          this.defalutParams.pageNum = 1
          this.getList()
        }
        this.delLoading = false
      })
    },
    // 删除单条
    delOne(data) {
      const _this = this
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        _this.delLoading = true
        const res = await _this.$api[_this.$route.meta.module][_this.$route.meta.request.del](data)
        if (res) {
          _this.$message.success('删除成功')
          _this.defalutParams.pageNum = 1
          _this.getList()
        }
        _this.delLoading = false
      }).catch(() => {
      })
    },
    // 多选
    selectCell(val) {
      this.multipleSelection = val
    }
  }
}
