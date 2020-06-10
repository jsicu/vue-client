<template>
  <div class="hello">{{msg}}</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App1'
    }
  },
  created () {
    this.getTest()
  },
  methods: {
    async getTest() {
      const res = await this.$api.test()
      console.log(res)
      this.msg = res
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
