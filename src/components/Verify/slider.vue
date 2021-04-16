<!-- 
  /** 
  * @Author: 林中奇 
  * @Date: 2020/12/15 
  * @lastAuthor: 
  * @lastChangeDate: 
  * @Explain: 滑块拼图验证 
  * @ChildComponents:
  */ -->
<template>
  <div style="position: relative;">
    <!-- puzzle的情况 -->
    <div
      v-if="type === '2'"
      class="verify-img-out"
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
      </div>
    </div>

    <!-- 公共部分 -->
    <div
      class="verify-bar-area"
      :style="{
        width: setSize.imgWidth,
        height: barHeight,
        'line-height': barHeight,
        'border-color': sliderBorderColor
      }"
    >
      <span class="verify-msg" v-text="tipsText" />
      <div
        class="verify-left-bar"
        :style="{
          width: leftBarWidth !== undefined ? leftBarWidth : barHeight,
          height: barHeight,
          'border-color': sliderBorderColor,
          transaction: transitionWidth
        }"
      />
      <div
        class="verify-move-block"
        @touchstart="start"
        @mousedown="start"
        :style="{
          width: barHeight,
          height: barHeight,
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
    // 滑块高度
    barHeight: {
      type: String,
      default: '40px'
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
      // 单位判断使用util.js
      barSize: {
        width: '310px',
        height: '40px'
      },
      blockSize: {
        width: '50px',
        height: '50px'
      },
      moveBlockLeft: 0,
      leftBarWidth: 0,
      sliderWidth: 0, // 移动距离
      // 移动中样式
      sliderBorderColor: '#ddd',
      iconColor: undefined,
      iconClass: 'icon-right',
      status: false, //鼠标状态
      isEnd: false, //是够验证完成
      showRefresh: true,
      transitionLeft: '',
      transitionWidth: '',
      distance: 0, // 滑块复位距离比较
      uuId: ''
    }
  },
  created() {},
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
      if (this.type !== '1') this.getPicture()

      this.$nextTick(() => {
        let setSize = this.resetSize(this) //重新设置宽度高度
        // 监听的问题
        for (let key in setSize) {
          this.$set(this.setSize, key, setSize[key])
        }
        this.$emit('ready', this)
      })

      const _this = this
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
        this.iconColor = '#fff'
        e.stopPropagation()
        this.status = true
      }
    },
    //鼠标移动
    move: function (e) {
      e = e || window.event
      if (this.status && this.isEnd == false) {
        if (!e.touches) {
          //兼容移动端
          var x = e.clientX
        } else {
          //兼容PC端
          var x = e.touches[0].pageX
        }

        var bar_area_left = this.barArea.getBoundingClientRect().left
        // 普通滑动验证
        this.sliderWidth = this.barArea.getBoundingClientRect().width - this.barArea.getBoundingClientRect().height // 扣除边框2px和滑块40px 270
        let move_block_left = x - bar_area_left //小方块相对于父元素的left值
        if (this.type !== '1') {
          // 图片滑动 2为边框2px
          if (
            move_block_left >=
            this.barArea.offsetWidth - Math.ceil((parseInt(this.setSize.imgWidth) * 60) / 620) - 2
          ) {
            move_block_left = this.barArea.offsetWidth - Math.ceil((parseInt(this.setSize.imgWidth) * 60) / 620) - 2
          }
        } else {
          // 普通滑动
          if (move_block_left >= this.barArea.offsetWidth - parseInt(parseInt(this.barHeight) / 2) - 2) {
            move_block_left = this.barArea.offsetWidth - parseInt(parseInt(this.barHeight) / 2) - 2
          }
        }

        // 左边超出时
        if (move_block_left <= parseInt(parseInt(this.barHeight) / 2)) {
          move_block_left = parseInt(parseInt(this.barHeight) / 2)
        }

        // 拖动后小方块的left值
        this.moveBlockLeft = move_block_left - parseInt(parseInt(this.barHeight) / 2) + 'px'
        this.leftBarWidth = move_block_left - parseInt(parseInt(this.barHeight) / 2) + 'px'
      }
    },

    // 鼠标松开
    async end() {
      this.endMovetime = +new Date()
      // 判断是否重合
      if (this.status && this.isEnd == false) {
        if (this.type !== '1') {
          // 图片滑动
          let moveLeftDistance = parseInt((this.moveBlockLeft || '').replace('px', ''))
          this.distance = moveLeftDistance = (moveLeftDistance * 310) / parseInt(this.setSize.imgWidth)

          const data = {
            uuId: this.uuId,
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
                this.$parent.clickShow = false
                this.refresh()
              }, 1000)
            }
            this.tipsBackColor = 'rgb(92, 184, 92,.5)'
            this.tipWords = `${((this.endMovetime - this.startMoveTime) / 1000).toFixed(2)}s验证成功`
            setTimeout(() => {
              this.tipWords = ''
              this.$emit('success', true)
            }, 800)
          } else {
            this.sliderBorderColor = 'red'
            this.iconColor = '#fff'
            this.iconClass = 'icon-close'

            this.tipsBackColor = 'rgb(217, 83, 79,.5)'
            setTimeout(() => {
              this.sliderBorderColor = '#ddd'
              this.reset()
              this.refresh()
            }, 500)
            this.$emit('error', false)
            this.tipWords = '验证失败'
          }
        } else {
          // 普通滑动
          this.distance = parseInt((this.moveBlockLeft || '').replace('px', ''))
          console.log(this.distance)
          if (this.distance === this.sliderWidth) {
            this.sliderBorderColor = '#7ac23c'
            this.iconColor = '#fff'
            this.iconClass = 'icon-check'
            this.showRefresh = false
            this.tipsText = '验证成功'
            this.isEnd = true
            this.$parent.clickShow = false
            this.$emit('success', true)
            // 未确定重置过程
            // const times = setTimeout(() => {
            //   this.refresh()
            //   clearTimeout(times)
            // }, 50);
          } else {
            this.sliderBorderColor = 'red'
            this.iconColor = '#fff'
            this.iconClass = 'icon-close'
            this.isEnd = true
            setTimeout(() => {
              this.reset()
            }, 800)
            this.$emit('error', false)
          }
        }

        this.status = false
      }
    },

    /**
     * refresh
     * @description 刷新
     */
    refresh() {
      this.leftBarWidth = 0
      this.isEnd = false
      this.moveBlockLeft = 0
      this.sliderBorderColor = '#ddd'
      this.iconColor = '#fff'
      this.iconClass = 'icon-right'
      this.showRefresh = true
      this.transitionLeft = 'left .3s'
      this.transitionWidth = 'width .3s'
      this.isEnd = false

      setTimeout(() => {
        if (this.type !== '1') this.getPicture()
        this.tipWords = ''
        this.transitionWidth = ''
        this.transitionLeft = ''
        this.tipsText = this.explain
      }, 500)
    },

    /**
     * blockCenter
     * ! 未使用等想优化了再来搞
     * @description 块居中
     */
    // blockCenter() {
    //   return Math.ceil(((parseInt(this.setSize.imgWidth) * 60) / 310 - parseInt(this.barHeight)) / 2)
    // },

    /**
     * reset
     * @description 滑块归位
     */
    reset() {
      const time = setInterval(() => {
        if (parseInt(this.distance) === 0 || !this.distance) {
          this.isEnd = false
          this.moveBlockLeft = 0
          this.sliderBorderColor = '#ddd'
          this.iconColor = '#fff'
          this.iconClass = 'icon-right'
          clearInterval(time)
        } else {
          let step = 20
          this.distance < 20 ? (step = 1) : (step = 20)
          this.distance -= step
          this.leftBarWidth = this.moveBlockLeft = this.distance + 'px'
        }
      }, 20)
    },

    // 请求背景图片和验证图片
    async getPicture() {
      const res = await this.$api.verify.getPicture()
      if (res) {
        this.backImgBase = res.sliderBG
        this.blockBackImgBase = res.slider
        this.uuId = res.uuId
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
  destroyed() {
    // 鼠标移动
    window.removeEventListener('touchmove', function (e) {
      this.move(e)
    })
    window.removeEventListener('mousemove', function (e) {
      this.move(e)
    })

    // 鼠标松开
    window.removeEventListener('touchend', function () {
      this.end()
    })
    window.removeEventListener('mouseup', function () {
      this.end()
    })
  }
}
</script>
