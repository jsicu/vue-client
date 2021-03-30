import Search from '@components/Search'
import ComTable from '@components/ComTable'
export default {
  components: {
    Search,
    ComTable
  },
  data() {
    return {
      loading: false, // 加载loading
      delLoading: false, // 删除loading
      listData: [], // 表格数据
      total: 0, // 总条数
      defaultParams: {
        pageNum: 1,
        pageSize: 10
      },
      pageSizes: [10, 20, 50, 100], // 页条数，可自定义
      dialogType: '', // 弹窗类型
      dialogTitle: '', // 弹窗标题
      dialogVisible: false, // 是否显示弹窗
      dialogComponent: '', // 组件名称
      multipleSelection: [], // 表格选中数据
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
  methods: {
    // 获取列表数据
    async getList() {
      this.loading = true
      try {
        // console.log(Object.assign(this.otherParams || {}, this.defaultParams))
        // console.log([this.$route.meta.module],[this.$route.meta.request])
        let res = {}
        // 自定义请求路径
        if (this.apiUrl && this.listApi) {
          res = await this.$api[this.apiUrl][this.listApi](Object.assign({}, this.otherParams, this.defaultParams))
        } else {
          res = await this.$api[this.$route.meta.module][this.$route.meta.request[this.listApi || 'list']](
            Object.assign({}, this.otherParams, this.defaultParams)
          )
        }
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
        throw err
      }
    },
    // 查询
    searchSubmit(row) {
      if (this.beforeSearch) {
        this.beforeSearch(row)
      } else {
        this.defaultParams = {
          pageNum: 1,
          pageSize: 10
        }
        this.defaultParams = Object.assign(this.defaultParams, row)
        for (const key in row) {
          if (row[key] == undefined || row[key]?.length === 0) delete this.defaultParams[key]
        }
        this.defaultParams.pageNum = 1
        this.getList()
      }
    },
    // 分页
    handleCurrentChange(val) {
      this.defaultParams.pageNum = val
      this.getList()
    },
    // 分页
    handleSizeChange(val) {
      this.defaultParams.pageSize = val
      this.getList()
    },
    // 显示弹窗
    showDialog(type, row, component, title) {
      this.dialogType = type
      if (title) {
        this.dialogTitle = title
      } else {
        this.dialogTitle = type === 'add' ? '新增' : type === 'edit' ? '编辑' : type === 'select' ? '选择应用' : '详情'
      }
      this.dialogVisible = true
      this.dialogComponent = component || 'Info'
    },
    // 关闭弹窗
    closeDialog(val) {
      this.dialogVisible = val
    },
    // 更新列表
    getData(type) {
      if (!type) {
        this.defaultParams.pageNum = 1
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
          if (!row[key]) delete this.defaultParams[key]
        }
        this.defaultParams.pageNum = 1
        delete this.defaultParams.startTime
        delete this.defaultParams.endTime
        this.getList()
      }
    },
    // 批量删除
    delData(data) {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择要删除的数据')
        return
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.delLoading = true
        // 兼容批量删除参数不统一
        let ids = ''
        if (!data) {
          ids = this.multipleSelection
            .map(item => {
              return item.id
            })
            .join(',')
        }
        let res = {}
        // 自定义请求路径
        if (this.apiUrl && this.delApi) {
          res = await this.$api[this.apiUrl][this.delApi](data ? data : { ids })
        } else {
          res = await this.$api[this.$route.meta.module][this.$route.meta.request[this.delApi || 'del']](
            data ? data : { ids }
          )
        }
        if (res) {
          this.$message.success('删除成功')
          this.defaultParams.pageNum = 1
          this.getList()
        }
        this.delLoading = false
      })
    },
    // 删除单条
    async delOne(data) {
      const _this = this
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          _this.delLoading = true
          let res = {}
          // 自定义请求路径
          if (this.apiUrl && this.delApi) {
            res = await this.$api[this.apiUrl][this.delApi](data)
          } else {
            res = await _this.$api[_this.$route.meta.module][_this.$route.meta.request[this.delApi || 'del']](data)
          }
          if (res) {
            _this.$message.success('删除成功')
            _this.defaultParams.pageNum = 1
            _this.getList()
          }
          _this.delLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 隐性删除单条（无确认提醒）
    async latentDel(data) {
      const _this = this
      _this.delLoading = true
      let res = {}
      // 自定义请求路径
      if (this.apiUrl && this.delApi) {
        res = await this.$api[this.apiUrl][this.delApi](data)
      } else {
        res = await _this.$api[_this.$route.meta.module][_this.$route.meta.request[this.delApi || 'del']](data)
      }
      if (res) {
        _this.defaultParams.pageNum = 1
        _this.getList()
      }
      _this.delLoading = false
    },
    // 多选
    selectCell(val) {
      this.multipleSelection = val
    }
  }
}
