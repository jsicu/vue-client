<!--
 * @Author: linzq
 * @Date: 2020-11-25 14:32:29
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-31 16:08:29
 * @Description: 
-->
<template>
  <div class="position">
    <div class="position" style="z-index: 10;">
      <loginWidget :color="vedioCanPlay ? ' #000' : '#eee' " />
    </div>
    <video src="../../assets/mp4/background.mp4" muted="muted" @canplay="canplay" autoplay="autoplay" loop="loop"
      style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;" />
    <!-- TODO: 初始进入页面会显示星空图，待优化 -->
    <div class="poster" v-if="!vedioCanPlay">
      <img src="../../assets/img/sky.jpg" alt="星空">
    </div>
  </div>
</template>

<script>
import loginWidget from './loginWidget'
export default {
  name: 'login',
  components: { loginWidget },
  data() {
    return {
      vedioCanPlay: false
    }
  },
  methods: {
    canplay() {
      this.vedioCanPlay = true
    }
  }
}
</script>


<style lang="less" scoped>
.position {
  height: 100%;
  width: 100%;
  position: relative;
}
.poster img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>