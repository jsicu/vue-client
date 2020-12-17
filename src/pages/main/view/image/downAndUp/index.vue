/**
 * @Author: 林中奇
 * @Date: 2020/07/10
 * @lastAuthor:
 * @lastChangeDate:
 * @Explain: 图片上传下载
 * @ChildComponents:
 */
<template>
  <div class="base-wrap">
    <div class="content">
      <div class="base-title">图片上传下载</div>

      <div class="com-table-wrap">
        <div class="com-button-wrap">
          <el-button type="primary" @click="dialogVisible = true">新增</el-button>
        </div>
        <comTable :columns="columns" :data="listData" :loading="loading" />
      </div>
    </div>

    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="50%"
      @close="closeDialog('ruleForm')"
    >
      <el-form ref="ruleForm" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="人员名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="图片名称">
          <el-input v-model="form.imgName"></el-input>
        </el-form-item>
        <el-form-item label="*图片" prop="imgLength">
          <el-upload
            :file-list="fileList"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="change"
            :limit="limit"
            :class="{hide: isHide}"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog custom-class="big-picture" :visible.sync="imgVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import tableMixins from '@/mixins/table-mixins'
export default {
  //import引入的组件需要注入到对象中才能使用
  mixins: [tableMixins],
  data() {
    const checkLength = (rule, value, callback) => {
      if (this.fileList.length === 0) {
        return callback(new Error('图片不得为空!'))
      } else {
        callback()
      }
    }
    return {
      fileList: [],
      limit: 1, // 上传上限
      isHide: false,
      dialogVisible: false,
      dialogImageUrl: '',
      imgVisible: false, // 图片查看大图弹窗
      disabled: false,
      form: {},
      rules: {
        name: [{ required: true, message: '必填项不得为空！' }],
        imgName: [{ required: true, message: '必填项不得为空！' }],
        imgLength: [{ validator: checkLength }]
      },
      columns: [
        { key: 'name', title: '名称' },
        {
          key: 'imgName',
          title: '是否上传图片',
          render: (h, params, index) => {
            if (params.status) {
              return h('div', '是')
            } else {
              return h('div', '否')
            }
          }
        },
        {
          title: '操作',
          key: 'action',
          width: '200px',
          render: (h, params, index) => {
            return h('div', [
              h(
                'el-button',
                {
                  props: {
                    type: 'primary',
                    plain: true,
                    size: 'mini',
                    icon: 'el-icon-search'
                  },
                  on: {
                    click: () => {
                      this.showdetail(params.personId)
                    }
                  }
                },
                '详情'
              ),
              h(
                'el-button',
                {
                  props: {
                    type: 'danger',
                    plain: true,
                    size: 'mini',
                    icon: 'el-icon-thumb'
                  },
                  on: {
                    click: () => {
                      this.delOne({ id: params.id })
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ]
    }
  },
  //监听属性 类似于data概念
  computed: {},
  watch: {},
  //方法集合
  methods: {
    // 新增弹窗关闭
    closeDialog(formName) {
      this.dialogVisible = false
      this.form = {}
      this.fileList = []
      this.$refs[formName].resetFields()
    },
    change(file, fileList) {
      this.fileList = fileList
      this.isHide = true
    },
    handleRemove(file) {
      console.log(file)
      // this.fileList = []
      // this.isHide = false
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.imgVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const formData = new FormData()
          formData.append('file', this.fileList[0].raw)
          formData.append('name', this.form.name)
          formData.append('imgName', this.form.imgName || '')
          const res = await this.$api.downAndUp.upload(formData)
          console.log(res)
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async showdetail(id) {
      const res = await this.$api.downAndUp.detail({ id })
      this.form = res
      this.dialogVisible = true
      res.imgList.forEach(item => {
        this.fileList.push({
          url:
            `http://127.0.0.1:4000/uploads/${item.imgId}.jpg`
        })
      })
      console.log(res)
    }
  },
  created() {},
  mounted() {}
}
</script>

<style lang='less' scoped>
// 查看大图
/deep/ .big-picture {
  margin-top: 5vh !important;

  .el-dialog__header {
    background-color: transparent;
  }
}
.hide {
  /deep/.el-upload {
    display: none;
  }
}
</style>