### 人机验证

人机验证，包含数字验证码、滑块拼图验证、点击文字验证



##### 基本用法

```vue
<template>
	<verify mode='fixed' captchaType='verifyCode' @success="success" @error="error" />
</template>

<script>
import verify from '@components/Verify'

export default {
  name: 'Verify',
  //import引入的组件需要注入到对象中才能使用
  components: { verify },
  data() {
    return {}
  },
  watch: {},
  //方法集合
  methods: {
    success(data) {
      this.$message('验证成功！')
    },
    error(data) {
      console.log('验证失败')
    },
    ready() {
      console.log('ready')
    }
  },
}
</script>
```

![image-20201225102233287](C:\Users\linzq33\AppData\Roaming\Typora\typora-user-images\image-20201225102233287.png)

##### 弹出式验证

```vue
<template>
  <div>
    <el-button type="text" @click="visible = true">点击打开验证</el-button>
    <verify
      :visible="visible"
      @success="success"
      @error="error"
      @ready="ready"
      @close="visible = false"
    />
  </div>
</template>

<script>
import verify from '@components/Verify'

export default {
  name: 'Verify',
  //import引入的组件需要注入到对象中才能使用
  components: { verify },
  data() {
    return {
      visible: false
    }
  },
  watch: {},
  //方法集合
  methods: {
    success(data) {
      this.$message('验证成功！')
      this.visible = false
    },
    error(data) {
      console.log('验证失败')
    },
    ready() {
      console.log('ready')
    }
  }
}
</script>
```

![image-20201225104846381](C:\Users\linzq33\AppData\Roaming\Typora\typora-user-images\image-20201225104846381.png)

**说明：**captchaType = verifyPuzzle| verifyPoint  两种验证需要后端接口配合。[node服务参看](https://github.com/lzq741167479/koa-server/blob/master/routes/image/index.js)里的image/verify和			image/check接口；[java服务参考](https://gitee.com/anji-plus/captcha/tree/master/service)。



##### 属性

| 参数        | 说明                                       | 类型             | 可选择                                                | 默认值                           |
| ----------- | ------------------------------------------ | ---------------- | ----------------------------------------------------- | -------------------------------- |
| captchaType | 验证类型                                   | String           | verifyCode， verifySlider，verifyPuzzle， verifyPoint | verifyCode                       |
| mode        | 展示形式                                   | String           | pop \| fixed                                          | pop                              |
| matchCase   | 数字验证码是否区分大小写                   | Boolean          | —                                                     | false                            |
| width       | 数字验证码宽度，单位: px                   | String \| Number | —                                                     | 90                               |
| height      | 数字验证码长度，单位: px                   | String \| Number | —                                                     | 36                               |
| fontSizeMin | 数字验证码字体最小值                       | String \| Number | —                                                     | 18                               |
| fontSizeMax | 数字验证码字体最大值                       | String \| Number | —                                                     | 24                               |
| space       | 图片与滑动条之间距离                       | Number           | —                                                     | 5                                |
| explain     | 滑动条初始提示语                           | String           | —                                                     | ‘向右滑动完成验证’               |
| imgSize     | 图片尺寸                                   | Object           | —                                                     | {width: '310px',height: '155px'} |
| barHeight   | 滑动条高度                                 | String           | —                                                     | 40px                             |
| checkNum    | 校对的文字数量，需要与后端协调，否则没效果 | Number           | —                                                     | 3                                |



##### 事件

| 事件方法 | 说明             | 回调参数    |
| -------- | ---------------- | ----------- |
| success  | 验证成功触发     | （Boolean） |
| error    | 验证失败触发     | （Boolean） |
| ready    | 组件渲染完成触发 | —           |
| close    | 弹出式关闭后触发 | —           |

