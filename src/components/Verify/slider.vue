/** * @Author: 林中奇 * @Date: 2020/12/15 * @lastAuthor: * @lastChangeDate: * @Explain: 滑块拼图验证 * @ChildComponents:
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
          <span class="verify-tips" v-if="tipWords" :style="{ 'background-color': tipsBackColor }">{{ tipWords }}</span>
        </transition>
      </div>
    </div>

    <!-- 公共部分 -->
    <div
      class="verify-bar-area"
      :style="{
        width: setSize.imgWidth,
        height: barSize.height,
        'line-height': barSize.height,
        'border-color': sliderBorderColor
      }"
    >
      <span class="verify-msg" v-text="tipsText" />
      <div
        class="verify-left-bar"
        :style="{
          width: leftBarWidth !== undefined ? leftBarWidth : barSize.height,
          height: barSize.height,
          'border-color': sliderBorderColor,
          transaction: transitionWidth
        }"
      />
      <div
        class="verify-move-block"
        @touchstart="start"
        @mousedown="start"
        :style="{
          width: barSize.height,
          height: barSize.height,
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
</template>
<script>
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
      tipsText: '',
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
      sliderWidth: 0, // 移动距离
      // 移动中样式
      sliderBorderColor: '#ddd',
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
      this.tipsText = this.explain
      this.getPictrue()

      this.$nextTick(() => {
        let setSize = this.resetSize(this) //重新设置宽度高度
        // 监听的问题
        for (let key in setSize) {
          this.$set(this.setSize, key, setSize[key])
        }
        this.$emit('ready', this)
      })

      var _this = this

      window.removeEventListener('touchmove', function(e) {
        _this.move(e)
      })
      window.removeEventListener('mousemove', function(e) {
        _this.move(e)
      })

      //鼠标松开
      window.removeEventListener('touchend', function() {
        _this.end()
      })
      window.removeEventListener('mouseup', function() {
        _this.end()
      })

      window.addEventListener('touchmove', function(e) {
        _this.move(e)
      })
      window.addEventListener('mousemove', function(e) {
        _this.move(e)
      })

      //鼠标松开
      window.addEventListener('touchend', function() {
        _this.end()
      })
      window.addEventListener('mouseup', function() {
        _this.end()
      })
    },

    //鼠标按下
    start(e) {
      e = e || window.event
      this.startMoveTime = +new Date() //开始滑动的时间
      if (this.isEnd == false) {
        this.iconColor = '#fff'
        e.stopPropagation()
        this.status = true
      }
    },
    //鼠标移动
    move: function(e) {
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

        var bar_area_left = this.barArea.getBoundingClientRect().left
        // 普通滑动验证
        this.sliderWidth = this.barArea.getBoundingClientRect().width - this.barArea.getBoundingClientRect().height // 扣除边框2px和滑块40px
        var move_block_left = x - bar_area_left //小方块相对于父元素的left值

        if (this.type !== '1') {
          //图片滑动
          if (move_block_left >= this.barArea.offsetWidth - parseInt(parseInt(this.blockSize.width) / 2) - 2) {
            move_block_left = this.barArea.offsetWidth - parseInt(parseInt(this.blockSize.width) / 2) - 2
          }
        } else {
          //普通滑动
          if (move_block_left >= this.barArea.offsetWidth - parseInt(parseInt(this.barSize.height) / 2) + 3) {
            move_block_left = this.barArea.offsetWidth - parseInt(parseInt(this.barSize.height) / 2) + 3
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

          const data = {
            checkJson: rsaEncrypt(moveLeftDistance)
          }

          const res = await this.$api.verify.check(data)
          if (res) {
            this.sliderBorderColor = '#7ac23c'
            this.iconColor = '#fff'
            this.iconClass = 'icon-check'
            this.showRefresh = false
            this.isEnd = true
            this.tipsText = '验证成功'
            if (this.mode == 'pop') {
              setTimeout(() => {
                this.refresh()
              }, 1500)
            }
            this.tipsBackColor = 'rgb(92, 184, 92,.5)'
            this.tipWords = `${((this.endMovetime - this.startMoveTime) / 1000).toFixed(2)}s验证成功`
            setTimeout(() => {
              this.tipWords = ''
              this.$emit('success', true)
            }, 1000)
          } else {
            this.sliderBorderColor = '#red'
            this.iconColor = '#fff'
            this.iconClass = 'icon-close'

            this.tipsBackColor = 'rgb(217, 83, 79,.5)'
            setTimeout(function() {
              this.sliderBorderColor = '#ddd'
              _this.refresh()
            }, 1000)
            this.$emit('error', false)
            this.tipWords = '验证失败'
            setTimeout(() => {
              this.tipWords = ''
            }, 1000)
          }
        } else {
          // 普通滑动
          let moveWidth = parseInt((this.moveBlockLeft || '').replace('px', ''))
          if (moveWidth === this.sliderWidth) {
            this.sliderBorderColor = '#7ac23c'
            this.iconColor = '#fff'
            this.iconClass = 'icon-check'
            this.showRefresh = false
            this.tipsText = '验证成功'
            this.isEnd = true
            this.$emit('success', true)
          } else {
            this.sliderBorderColor = 'red'
            this.iconColor = '#fff'
            this.iconClass = 'icon-close'
            this.isEnd = true
            this.$emit('error', false)
            // 滑块归位
            const time = setInterval(() => {
              if (moveWidth === 0) {
                this.isEnd = false
                this.moveBlockLeft = 0
                this.sliderBorderColor = '#ddd'
                this.iconColor = '#fff'
                this.iconClass = 'icon-right'
                clearInterval(time)
              } else {
                let step = 10
                moveWidth < 10 ? (step = 1) : (step = 10)
                moveWidth -= step
                this.leftBarWidth = this.moveBlockLeft = moveWidth + 'px'
              }
            }, 50)
          }
        }

        this.status = false
      }
    },

    refresh: function() {
      this.showRefresh = true

      this.transitionLeft = 'left .3s'
      this.moveBlockLeft = 0
      this.leftBarWidth = undefined
      this.transitionWidth = 'width .3s'

      this.sliderBorderColor = '#ddd'
      this.iconColor = '#000'
      this.iconClass = 'icon-right'

      this.getPictrue()
      this.isEnd = false

      setTimeout(() => {
        this.transitionWidth = ''
        this.transitionLeft = ''
        this.tipsText = this.explain
      }, 300)
    },

    // 请求背景图片和验证图片
    async getPictrue() {
      const res = await this.$api.verify.getPicture()
      if (res) {
        this.backImgBase = res.sliderBG
        this.blockBackImgBase = res.slider
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
    this.$el.onselectstart = function() {
      return false
    }
  },
  i18n: {
    messages: {
      'en-US': {},
      'zh-CN': {}
    }
  }
}
</script>
