/** 
 * @Author: 林中奇 
 * @Date: 2020/12/15 
 * @lastAuthor: 
 * @lastChangeDate: 
 * @Explain: 滑块拼图验证 
 * @ChildComponents:
 */
<template>
  <div style="position: relative;">
    <!-- puzzle的情况 -->

    <div
      v-if="type === '2'"
      class="verify-img-out"
      v-show="showImage"
      :style="{ height: parseInt(setSize.imgHeight) + space + 'px' }"
    >
      <div class="verify-img-panel" :style="{ width: setSize.imgWidth, height: setSize.imgHeight }">
        <img :src="backImgBase" alt style="width:100%;height:100%;display:block" />
        <div class="verify-refresh" @click="refresh" v-show="showRefresh">
          <i class="iconfont icon-refresh"></i>
        </div>
        <transition name="tips">
          <span
            class="verify-tips"
            v-if="tipWords"
            :style="{ 'background-color': tipsBackColor }"
          >{{ tipWords }}</span>
        </transition>
        <!-- <div class="verify-gap"
        :style="{'width': blockSize.width, 'height': blockSize.height, top: top + 'px', left: left + 'px'}"></div>-->
      </div>
    </div>

    <!-- 公共部分 -->
    <div
      class="verify-bar-area"
      :style="{ width: setSize.imgWidth, height: barSize.height, 'line-height': barSize.height }"
    >
      <span class="verify-msg" v-text="text"></span>
      <div
        class="verify-left-bar"
        :style="{
          width: leftBarWidth !== undefined ? leftBarWidth : barSize.height,
          height: barSize.height,
          'border-color': leftBarBorderColor,
          transaction: transitionWidth
        }"
      >
        <span class="verify-msg" v-text="finishText"></span>
        <div
          class="verify-move-block"
          @touchstart="start"
          @mousedown="start"
          :style="{
            width: barSize.height,
            height: barSize.height,
            'background-color': moveBlockBackgroundColor,
            left: moveBlockLeft,
            transition: transitionLeft
          }"
        >
          <i :class="['verify-icon iconfont', iconClass]" :style="{ color: iconColor }"></i>
          <div
            v-if="type === '2'"
            class="verify-sub-block"
            :style="{
              width: Math.ceil((parseInt(setSize.imgWidth) * 60) / 310) + 'px',
              height: setSize.imgHeight,
              top: '-' + (parseInt(setSize.imgHeight) + space) + 'px',
              'background-size': setSize.imgWidth + ' ' + setSize.imgHeight
            }"
            v-show="showImage"
          >
            <img :src="blockBackImgBase" alt style="width:100%;height:100%;display:block" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
/**
 * VerifySlide
 * @description 滑块
 */
import { rsaEncrypt } from '@/utils/index.js'
import { resetSize } from '@/utils/util' // %转px

export default {
  name: 'VerifySlide',
  props: {
    type: {
      type: String,
      default: '1'
    },
    //弹出式pop，固定fixed
    mode: {
      type: String,
      default: 'fixed'
    },
    vOffset: {
      type: Number,
      default: 5
    },
    space: {
      type: Number,
      default: 5
    },
    explain: {
      type: String,
      default: '向右滑动完成验证'
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
    barSize: {
      type: Object,
      default() {
        return {
          width: '310px',
          height: '40px'
        }
      }
    }
  },
  data() {
    return {
      backImgBase: '', // 验证码背景图片
      blockBackImgBase: '', // 验证滑块的背景图片
      startMoveTime: '', // 移动开始的时间
      endMovetime: '', // 移动结束的时间
      tipsBackColor: '', // 提示词的背景颜色
      tipWords: '',
      text: '',
      finishText: '',
      setSize: {
        imgHeight: 0,
        imgWidth: 0,
        barHeight: 0,
        barWidth: 0
      },
      blockSize: {
        width: '50px',
        height: '50px'
      },
      showImage: true,
      moveBlockLeft: undefined,
      leftBarWidth: undefined,
      // 移动中样式
      moveBlockBackgroundColor: undefined,
      leftBarBorderColor: '#ddd',
      iconColor: undefined,
      iconClass: 'icon-right',
      status: false, //鼠标状态
      isEnd: false, //是够验证完成
      showRefresh: true,
      transitionLeft: '',
      transitionWidth: ''
    }
  },
  computed: {
    barArea() {
      return this.$el.querySelector('.verify-bar-area')
    },
    resetSize() {
      return resetSize
    }
  },
  methods: {
    init() {
      this.text = this.explain
      this.getPictrue()

      this.$nextTick(() => {
        let setSize = this.resetSize(this) //重新设置宽度高度
        console.log(setSize)
        // 监听的问题
        for (let key in setSize) {
          this.$set(this.setSize, key, setSize[key])
        }
        this.$parent.$emit('ready', this)
      })

      var _this = this

      window.removeEventListener('touchmove', function (e) {
        _this.move(e)
      })
      window.removeEventListener('mousemove', function (e) {
        _this.move(e)
      })

      //鼠标松开
      window.removeEventListener('touchend', function () {
        _this.end()
      })
      window.removeEventListener('mouseup', function () {
        _this.end()
      })

      window.addEventListener('touchmove', function (e) {
        _this.move(e)
      })
      window.addEventListener('mousemove', function (e) {
        _this.move(e)
      })

      //鼠标松开
      window.addEventListener('touchend', function () {
        _this.end()
      })
      window.addEventListener('mouseup', function () {
        _this.end()
      })
    },

    //鼠标按下
    start(e) {
      e = e || window.event
      this.startMoveTime = +new Date() //开始滑动的时间
      if (this.isEnd == false) {
        this.text = ''
        this.moveBlockBackgroundColor = '#337ab7'
        this.leftBarBorderColor = '#337AB7'
        this.iconColor = '#fff'
        e.stopPropagation()
        this.status = true
      }
    },
    //鼠标移动
    move: function (e) {
      e = e || window.event
      if (this.status && this.isEnd == false) {
        // if (this.mode == 'pop') {
        //    this.showImage = true
        // }

        if (!e.touches) {
          //兼容移动端
          var x = e.clientX
        } else {
          //兼容PC端
          var x = e.touches[0].pageX
        }
        // var bar_area_left = this.getLeft(this.barArea);
        var bar_area_left = this.barArea.getBoundingClientRect().left
        var move_block_left = x - bar_area_left //小方块相对于父元素的left值

        if (this.type !== '1') {
          //图片滑动
          if (move_block_left >= this.barArea.offsetWidth - parseInt(parseInt(this.blockSize.width) / 2) - 2) {
            move_block_left = this.barArea.offsetWidth - parseInt(parseInt(this.blockSize.width) / 2) - 2
          }
        } else {
          //普通滑动
          if (move_block_left >= this.barArea.offsetWidth - parseInt(parseInt(this.barSize.height) / 2) + 3) {
            this.finishText = '松开验证'
            move_block_left = this.barArea.offsetWidth - parseInt(parseInt(this.barSize.height) / 2) + 3
          } else {
            this.finishText = ''
          }
        }

        if (move_block_left <= 0) {
          move_block_left = parseInt(parseInt(this.blockSize.width) / 2)
        }

        //拖动后小方块的left值
        this.moveBlockLeft = move_block_left - parseInt(parseInt(this.blockSize.width) / 2) + 'px'
        this.leftBarWidth = move_block_left - parseInt(parseInt(this.blockSize.width) / 2) + 'px'
      }
    },

    // 鼠标松开
    async end() {
      this.endMovetime = +new Date()
      var _this = this
      // 判断是否重合
      if (this.status && this.isEnd == false) {
        if (this.type !== '1') {
          // 图片滑动
          var moveLeftDistance = parseInt((this.moveBlockLeft || '').replace('px', ''))
          moveLeftDistance = (moveLeftDistance * 310) / parseInt(this.setSize.imgWidth)

          var captchaVerification = rsaEncrypt(JSON.stringify({ x: moveLeftDistance, y: 5.0 }))
          let data = {
            checkJson: rsaEncrypt(moveLeftDistance)
          }
          
          const res = await this.$api.verify.check(data)
          if (res) {
            this.moveBlockBackgroundColor = '#5cb85c'
            this.leftBarBorderColor = '#5cb85c'
            this.iconColor = '#fff'
            this.iconClass = 'icon-check'
            this.showRefresh = false
            this.isEnd = true
            if (this.mode == 'pop') {
              setTimeout(() => {
                // this.$parent.clickShow = false
                this.refresh()
              }, 1500)
            }
            // this.tipsBackColor = '#5cb85c'
            this.tipsBackColor = 'rgb(92, 184, 92,.5)'
            this.tipWords = `${((this.endMovetime - this.startMoveTime) / 1000).toFixed(2)}s验证成功`
            setTimeout(() => {
              this.tipWords = ''
              // this.$parent.closeBox()
              this.$parent.$emit('success', { captchaVerification })
            }, 1000)
          } else {
            this.moveBlockBackgroundColor = '#d9534f'
            this.leftBarBorderColor = '#d9534f'
            this.iconColor = '#fff'
            this.iconClass = 'icon-close'
            // this.tipsBackColor = '#d9534f'
            this.tipsBackColor = 'rgb(217, 83, 79,.5)'
            setTimeout(function () {
              _this.refresh()
            }, 1000)
            this.$emit('error', this)
            this.tipWords = '验证失败'
            setTimeout(() => {
              this.tipWords = ''
            }, 1000)
          }
        } else {
          // 普通滑动
          if (
            parseInt((this.moveBlockLeft || '').replace('px', '')) >=
            parseInt(this.setSize.barWidth) - parseInt(this.barSize.height) - parseInt(this.vOffset)
          ) {
            this.moveBlockBackgroundColor = '#5cb85c'
            this.leftBarBorderColor = '#5cb85c'
            this.iconColor = '#fff'
            this.iconClass = 'icon-check'
            this.showRefresh = false
            this.finishText = '验证成功'
            this.isEnd = true
            this.$parent.$emit('success', this)
          } else {
            this.finishText = ''
            this.moveBlockBackgroundColor = '#d9534f'
            this.leftBarBorderColor = '#d9534f'
            this.iconColor = '#fff'
            this.iconClass = 'icon-close'
            this.isEnd = true

            setTimeout(function () {
              _this.finishText = ''
              _this.refresh()
              _this.isEnd = false
            }, 400)

            this.$parent.$emit('error', this)
          }
        }

        this.status = false
      }
    },

    refresh: function () {
      this.showRefresh = true
      this.finishText = ''

      this.transitionLeft = 'left .3s'
      this.moveBlockLeft = 0

      this.leftBarWidth = undefined
      this.transitionWidth = 'width .3s'

      this.leftBarBorderColor = '#ddd'
      this.moveBlockBackgroundColor = '#fff'
      this.iconColor = '#000'
      this.iconClass = 'icon-right'

      this.getPictrue()
      this.isEnd = false

      setTimeout(() => {
        this.transitionWidth = ''
        this.transitionLeft = ''
        this.text = this.explain
      }, 300)
    },

    //获取left值
    getLeft: function (node) {
      let leftValue = 0
      while (node) {
        leftValue += node.offsetLeft
        node = node.offsetParent
      }
      let finalvalue = leftValue
      return finalvalue
    },

    // 请求背景图片和验证图片
    async getPictrue() {
      const res = await this.$api.verify.getPicture()
      if (res) {
        this.backImgBase = res.sliderBG
        this.blockBackImgBase = res.slider
      } else {
        this.tipWords = res.repMsg
      }
    }
  },
  watch: {
    // type变化则全面刷新
    type: {
      immediate: true,
      handler() {
        this.init()
      }
    }
  },
  mounted() {
    // 禁止拖拽
    this.$el.onselectstart = function () {
      return false
    }
  },
  // created(){

  // },
  i18n: {
    messages: {
      'en-US': {},
      'zh-CN': {}
    }
  }
}
</script>
