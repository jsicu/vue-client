<template>
  <div @click="refresh">
    <canvas
      :id="canvasId"
      :width="contentWidth"
      :height="contentHeight"
      @error="canvasIdErrorCallback"
    ></canvas>
  </div>
</template>
<script>
import { pool } from './codeJson'
export default {
  name: 'SIdentify',
  props: {
    // 字体最小值
    fontSizeMin: {
      type: String | Number,
      default: 18
    },
    // 字体最大值
    fontSizeMax: {
      type: String | Number,
      default: 24
    },
    width: {
      type: String | Number,
      default: 90
    },
    height: {
      type: String | Number,
      default: 36
    },
    // 是否区分大小写
    matchCase: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      canvasId: `canvas${new Date().getTime()}`,
      verification: '', // 验证码暂存
      contentHeight: 36,
      contentWidth: 90
    }
  },
  created() {},
  methods: {
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 生成一个随机的颜色
    randomColor(min, max) {
      let r = this.randomNum(min, max)
      let g = this.randomNum(min, max)
      let b = this.randomNum(min, max)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    drawPic() {
      let canvas = document.getElementById(this.canvasId)
      let ctx = canvas.getContext('2d')
      ctx.textBaseline = 'bottom'
      // 绘制背景
      ctx.fillStyle = this.randomColor(180, 240)
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
      // 绘制文字
      let str = ''
      for (let i = 0; i < 4; i++) {
        const text = pool[this.randomNum(0, pool.length - 1)]
        this.drawText(ctx, text, i)
        str += text
      }
      this.verification = str
      this.drawLine(ctx)
      this.drawDot(ctx)
    },
    drawText(ctx, txt, i) {
      ctx.fillStyle = this.randomColor(50, 160) //随机生成字体颜色
      ctx.font = this.randomNum(Number(this.fontSizeMin), Number(this.fontSizeMax)) + 'px SimHei' //随机生成字体大小
      const x = (i + 1) * (this.contentWidth / 5)
      const y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
      const deg = this.randomNum(-30, 30)
      // 修改坐标原点和旋转角度
      ctx.translate(x, y)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(txt, 0, 0)
      // 恢复坐标原点和旋转角度
      ctx.rotate((-deg * Math.PI) / 180)
      ctx.translate(-x, -y)
    },
    drawLine(ctx) {
      // 绘制干扰线
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = this.randomColor(100, 200)
        ctx.beginPath()
        ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
        ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
        ctx.stroke()
      }
    },
    drawDot(ctx) {
      // 绘制干扰点
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = this.randomColor(0, 255)
        ctx.beginPath()
        ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI)
        ctx.fill()
      }
    },
    refresh() {
      this.drawPic()
    },
    checkCode(code) {
      if (!code) return false
      if (this.matchCase) {
        for (let i = 0; i < this.verification.length; i++) {
          if (code[i] !== this.verification[i]) {
            this.refresh()
            return false
          }
        }
      } else if (code.toLowerCase() !== this.verification.toLowerCase()) {
        this.refresh()
        return false
      }
      this.$parent.clickShow = false
      return true
    },
    canvasIdErrorCallback: function (e) {
      console.error(e.detail.errMsg)
    }
  },
  watch: {
    width: {
      immediate: true,
      handler(width) {
        this.contentWidth = parseInt(width)
      }
    },
    height: {
      immediate: true,
      handler(height) {
        this.contentHeight = parseInt(height)
      }
    }
  },
  mounted() {
    this.drawPic()
  }
}
</script>