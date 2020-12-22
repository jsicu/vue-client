<!--
  /**
   * @Author: 林中奇
   * @Date: 2020/12/18
   * @lastAuthor:
   * @lastChangeDate:
   * @description: 人机验证
   * @ChildComponents:
   */ -->
<template>
  <div :class="mode == 'pop' ? 'mask' : ''" v-show="showBox">
    <div
      :class="mode == 'pop' ? 'verifybox' : ''"
      :style="{ 'max-width': parseInt(imgSize.width) + 30 + 'px' }"
    >
      <div
        v-if="mode == 'pop'"
        class="verifybox-top"
        :style="{ width: parseInt(imgSize.width) + 29 + 'px' }"
      >
        请完成安全验证
        <span class="verifybox-close" @click="closeBox">
          <i class="iconfont icon-close"></i>
        </span>
      </div>
      <div class="verifybox-bottom" :style="{ padding: mode == 'pop' ? '15px' : '0' }">
        <el-row :gutter="10">
          <el-col :span="componentType === 'VerifyCode' ? 17 : 0">
            <el-input v-model="code" maxlength="4" placeholder="请输入右侧四位验证码" @input="codeChange" />
          </el-col>
          <el-col :span="componentType === 'VerifyCode' ? 7 : 24">
            <!-- 验证码容器 -->
            <components
              v-if="componentType"
              :is="componentType"
              v-bind="$attrs"
              style="padding-top: 1px;"
              :captchaType="captchaType"
              :type="verifyType"
              :mode="mode"
              :imgSize="imgSize"
              ref="instance"
            />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
/**
 * Verify 验证码组件
 * @description 分发验证码使用
 * */
import VerifyCode from './code'
import VerifySlide from './slider'
import VerifyPoints from './point'

export default {
  name: 'Verify',
  props: {
    captchaType: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      default: 'pop'
    },
    imgSize: {
      type: Object,
      default() {
        return {
          width: '310px',
          height: '155px'
        }
      }
    },
    // 弹窗式标志位
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      code: '',
      clickShow: false,
      // 内部类型
      verifyType: undefined,
      // 所用组件类型
      componentType: undefined
    }
  },
  methods: {
    /**
     * refresh
     * @description 刷新
     * */
    refresh() {
      if (this.instance.refresh) {
        this.instance.refresh()
      }
    },
    closeBox() {
      this.clickShow = false
      this.refresh()
      this.$emit('error', false)
    },
    /**
     * checkCode
     * @description 判断验证码
     */
    codeChange(e) {
      if (e.length === 4) {
        const result = this.instance.checkCode(e)
        const times = setTimeout(() => {
          if (result) {
            this.$emit('success', true)
          } else {
            this.$emit('error', false)
            this.$message.error('验证失败！')
          }
          this.code = ''
          clearTimeout(times)
        }, 500)
      }
    }
  },
  computed: {
    instance() {
      return this.$refs.instance || {}
    },
    showBox() {
      if (this.mode == 'pop') {
        return this.clickShow
      } else {
        return true
      }
    }
  },
  watch: {
    captchaType: {
      immediate: true,
      handler(captchaType) {
        switch (captchaType.toString()) {
          case 'blockPuzzle':
            this.verifyType = '2'
            this.componentType = 'VerifySlide'
            break
          case 'clickWord':
            this.verifyType = ''
            this.componentType = 'VerifyPoints'
            break
          case 'graphicCode':
            this.verifyType = ''
            this.componentType = 'VerifyCode'
            break
        }
      }
    },
    visible: {
      immediate: true,
      handler(visible) {
        if (this.mode == 'pop') {
          this.clickShow = visible
        }
      }
    }
  },
  components: {
    VerifyCode,
    VerifySlide,
    VerifyPoints
  },
  mounted() {
    // if (this.mode=="pop") {
    //     document.querySelector(this.containerId).addEventListener('click',()=>{
    //        this.clickShow = true;
    //     })
    // }
  }
}
</script>
<style lang="less" scoped>
.verifybox {
  position: relative;
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid #e4e7eb;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.verifybox-top {
  padding: 0 15px;
  height: 50px;
  line-height: 50px;
  text-align: left;
  font-size: 16px;
  color: #45494c;
  border-bottom: 1px solid #e4e7eb;
  box-sizing: border-box;
}
.verifybox-bottom {
  padding: 15px;
  box-sizing: border-box;
}
.verifybox-close {
  position: absolute;
  top: 13px;
  right: 9px;
  width: 24px;
  height: 24px;
  text-align: center;
  cursor: pointer;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  /* display: none; */
  transition: all 0.5s;
}
.verify-btn {
  width: 200px;
  height: 30px;
  background-color: #337ab7;
  color: #ffffff;
  border: none;
  margin-top: 10px;
}
</style>
