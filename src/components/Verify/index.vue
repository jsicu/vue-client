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
          <el-col :span="componentType === 'verifyCode' ? 17 : 0">
            <el-input v-model="code" maxlength="4" placeholder="请输入右侧四位验证码" @input="codeChange" />
          </el-col>
          <el-col :span="componentType === 'verifyCode' ? 7 : 24">
            <!-- 验证码容器 -->
            <components
              v-if="componentType"
              :is="componentType"
              v-bind="$attrs"
              v-on="$listeners"
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
import verifyCode from './code'
import verifySlider from './slider'
import verifyPoint from './point'

export default {
  name: 'Verify',
  components: {
    verifyCode,
    verifySlider,
    verifyPoint
  },
  props: {
    captchaType: {
      type: String,
      default: 'verifyCode'
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
     */
    refresh() {
      if (this.$refs.instance.refresh) {
        this.$refs.instance.refresh()
      }
    },
    /**
     * closeBox
     * @description 关闭弹窗
     */
    closeBox() {
      this.clickShow = false
      this.refresh()
      this.$emit('close')
    },
    /**
     * checkCode
     * @description 判断验证码
     */
    codeChange(e) {
      if (e.length === 4) {
        const result = this.$refs.instance.checkCode(e)
        const times = setTimeout(() => {
          if (result) {
            this.$emit('success', true)
          } else {
            this.$emit('error', false)
            this.code = ''
            this.$message.error('验证失败！')
          }
          clearTimeout(times)
        }, 500)
      }
    }
  },
  computed: {
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
        // 销毁原组件，避免不必要的问题
        this.componentType = false
        const times = setTimeout(() => {
          switch (captchaType.toString()) {
            case 'verifyPuzzle':
              this.verifyType = '2'
              this.componentType = 'verifySlider'
              break
            case 'verifySlider':
              this.verifyType = '1'
              this.componentType = 'verifySlider'
              break
            case 'verifyPoint':
              this.verifyType = ''
              this.componentType = 'verifyPoint'
              break
            case 'verifyCode':
              this.verifyType = ''
              this.componentType = 'verifyCode'
              break
          }
          clearTimeout(times)
        }, 20)
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
  mounted() {}
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
  z-index: 1999; // 等级最高
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

<style>
.verify-tips {
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 30px;
  background-color: rgb(231, 27, 27, 0.5);
  line-height: 30px;
  color: #fff;
}
.tips-enter-active {
  transition: all 1.5s ease;
}
.tips-leave-active {
  transition: all 1.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.tips-enter,
.tips-leave-to {
  transform: translateY(25px);
  opacity: 0;
}

/*滑动验证码*/
.verify-bar-area {
  position: relative;
  background: #ffffff;
  text-align: center;
  box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.verify-bar-area .verify-move-block {
  position: absolute;
  top: 0px;
  left: 0;
  background: #fff;
  cursor: pointer;
  box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  box-shadow: 0 0 2px #888888;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

.verify-bar-area .verify-left-bar {
  position: absolute;
  top: -1px;
  left: -1px;
  background: #419041;
  cursor: pointer;
  box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  border: 1px solid #000;
  opacity: 0.5;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.verify-img-panel {
  margin: 0;
  box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.verify-img-panel .verify-refresh {
  width: 25px;
  height: 25px;
  text-align: center;
  padding: 5px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
}

.verify-img-panel .icon-refresh {
  font-size: 20px;
  color: #fff;
}

.verify-bar-area .verify-move-block .verify-sub-block {
  position: absolute;
  text-align: center;
  z-index: 3;
  /* border: 1px solid #fff; */
}

.verify-bar-area .verify-move-block .verify-icon {
  font-size: 18px;
}

.verify-bar-area .verify-msg {
  z-index: 3;
}

.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-check:before {
  content: ' ';
  display: block;
  width: 16px;
  height: 16px;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABcElEQVQ4T5WTQU7CUBRF323DADSRiQmMxB3AmBphB4UNqCvQHdglyAqEDVB2AAQZ4xLKqCROaiJhAPxrfklrKUW0s/7338l9990POfLZ08sqYF7oMrn9HNQ/3rOuIn3YnpbuSTxDUEnWKPRE6LjWopc8jwH2rFjEMu9C0DimKlQjHPFs1RrUgkD/x4DWpDwCcPtbc1TTENfymzFAyxYar39qBjsgHgXqoV9fdEMF7beyJ4KrkwCoB6XEM2AMtSeu5V9Du20wNzvVTLBD2XShckNAivq+wroGe1JqaOIPgPO0Gor0aCoHG2MWNYcAquYBIKQy9wSRu10GOOb5ysayMIRINal0B0iNQEpAY93UEBGp0lQ2toabbo5HyDIxgkhh7WFZeInU7PvEed/yK7stZKxRQyAcCWBnGpxco77wryCRY/fGDxO7H+Wv/OBUGiNTD6IcydyNA+cwWJwL6Oj0ZT6m9Jx6O6LMMDBibINjz/kbGha2m6y4qkUAAAAASUVORK5CYII=');
  background-size: contain;
}

.icon-close:before {
  content: ' ';
  display: block;
  width: 16px;
  height: 16px;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgUlEQVQ4T4VTQVLCQBDsSSrJRSw8ayy9KJ7EF4AvUF8gvEB+APwAXkB+IL5A/EE4gV6sEj2LxItsJWNlkw0bCbK3nZ3p6enpJRSc1zLKPyWzRmRW42fm0HeC8Ol4jvnfdNIDSaHVBlGrCBjMPScQXR0oA3jZt6qRiQFAsuvmw74RonnyIfw4RwLIzrvW4/ZiBcu+sxCXMRMJMD2wejDoLnnmL0TwVve0KOI+CHUQnctIxP3Ku2hR0t3+XFFmv/ImLiau1SCiQSIiN89mwpu4lkdEtyrXWSz36Nk1r5nMe31mYvZOZ6IZg8TxtDgDVLnE4Q1NDu0OAe219aQgcVxno+cx0N0IoGhvBSgaQZu5YQA1NY7SJDfCmoiMh8psea3TVppMXXsIwlVOxII1zokxZCIpoL4dAEcAlXNrzIxUskbZjv/xYWIVHjuBqGdGimPSyga8rSDMYyNCI2dl1VDqsWN11lyoEiLuO9+iU/iZdNYx0LJk1qP0Oxsc+nYQjoq+8y9lMciXYRm9/gAAAABJRU5ErkJggg==');
  background-size: contain;
}

.icon-right:before {
  content: ' ';
  display: block;
  width: 16px;
  height: 16px;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-size: cover;
  z-index: 999;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAp0lEQVQ4T6XS6xEBUQwG0LMd6IQO0AkdUAElUAEdoAI6QCXowGTmMh77uDub/zmTfEmhYxUd+5UBI/SxzsHLgAFO2GGOex1UtUIge9wwxaUKqcughy2GCQnwr3JCXGKBVVrpC8kBoiGCjQnOGH8KbYAI9Zqwt5EDvFaIs85+Q2gKcZNGnqQVskOMM8bID0RzqzNG8xGHNHLrR4rEA4mzNVZOiLVIZ+AJovQaEdnHCVcAAAAASUVORK5CYII=');
  background-size: contain;
}

.icon-refresh:before {
  content: ' ';
  display: block;
  width: 16px;
  height: 16px;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGUlEQVQ4T5WTwVHDQAxF3z9yCx24A1wBkxLSASkhHQCXnEMHpgKgAkIFQAehA3cg5me0mY2JE6OLx2vprfT9JU5ERCyAG6AFeuALeJO0G6arPoiIOXAPXANdFjrF54a+A4+S+ogwvDkAImIJPABLSduRzpyzAW7dEfC8ByTNHxamnyouZxGxAtbA1X6sBHjG+aXizPVodwn8UM7tm00+G1WnhzwDPPdOksn/DgNeLcyYcJeIBdBJMmhyRIRF7wzw7M0UDQae6SXNDJilBn5OihTTXbflN1rA7VQha90KwLdbg5Uke2I00rFtGbm2coG8SHoaErJt78mPLV9Md7RM6TT7wsJ+VhAvzncWHu3JH0Dl+cZ/x+/nPPILIyiEL2NqG0oAAAAASUVORK5CYII=');
  background-size: contain;
}
</style>
