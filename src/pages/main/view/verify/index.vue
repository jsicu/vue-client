<!--
  /**
   * @Author: 林中奇
   * @Date: 2020/12/22
   * @lastAuthor:
   * @lastChangeDate:
   * @description: 人机验证模板
   * @ChildComponents:
   */ -->
<template>
  <div class="base-wrap">
    <div class="pro-panel clearfix">
      <div class="pro-menu-panel">
        <el-tree
          :data="menuJson"
          default-expand-all
          ref="treeBox"
          :highlight-current="true"
          :current-node-key="1"
          :props="defaultProps"
          @node-click="handleNodeClick"
          node-key="id"
        />
      </div>
      <div class="pro-content">
        <div style="display: flex;">
          <span style="line-height: 38px;">普通验证：</span>
          <verify :captchaType="moduleName" mode="fixed" @success="success" @error="error" />
        </div>弹出式验证：
        <el-button type="text" @click="click">点击打开验证</el-button>
        <verify
          :captchaType="moduleName"
          :visible="visible"
          barHeight="30px"
          :imgSize="imgSize"
          @success="success"
          @error="error"
          @ready="ready"
          @close="visible = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import menuJson from './menu'
import verify from '@components/Verify'

export default {
  name: 'Verify',
  //import引入的组件需要注入到对象中才能使用
  components: { verify },
  data() {
    return {
      barSize: { width: '360px', height: '50px' },
      imgSize: { width: '400px', height: '200px' },

      menuJson,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      moduleName: 'verifyCode',
      visible: false
    }
  },
  //监听属性 类似于data概念
  computed: {},
  watch: {},
  //方法集合
  methods: {
    //菜单点击事件
    handleNodeClick(params) {
      if (!params.alias && params.href) {
        window.location.href = params.href
      } else {
        this.moduleName = params.alias
      }
    },
    click() {
      this.visible = true
    },
    success(data) {
      console.log(data)
      this.$message('验证成功！')
      // this.dialogVisible = false
      this.visible = false
    },
    error(data) {
      console.log(data)
    },
    ready() {
      console.log('ready')
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang='less' scoped>
// @import url();
.pro-panel {
  height: 95%;
  background-color: #f1f1f1f1;
  .pro-menu-panel {
    border-right: 1px solid #e3e3e3;
    width: 240px;
    height: 100%;
    float: left;
    background-color: #fff;
    box-shadow: 2px 1px 3px rgba(0, 0, 0, 0.3);
    padding: 10px 0;
  }

  .pro-content {
    padding: 12px;
    margin-left: 250px;
    background-color: #fff;
    height: 100%;
    border-left: 1px solid #e3e3e3;
    overflow-x: hidden;
    overflow-y: auto;
    &.single-page {
      margin-left: 0;
    }
  }
}
/*通过为父元素添加 .clearfix 类可以很容易地清除浮动*/
.clearfix:after,
.clearfix:before {
  content: '.';
  display: block;
  font-size: 0;
  height: 0;
  line-height: 0;
  overflow: hidden;
  visibility: hidden;
  width: 0;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  zoom: 1;
}
</style>