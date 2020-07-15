<template>
  <div id="app">
    <!-- 这是登录成功页 -->
    <router-view />
  </div>
</template>

<script>
import list from './routerList'

export default {
  name: 'App',
  created() {
    // TODO: 如何数据持久化。数据持久化更新不了视图。暂时无解
    if (this.$wsCache.get('newMenu')) {
      this.$store.dispatch('RenderNewMenu').then(() => {
        this.$router.options.routes = this.$store.getters.routers
        this.$router.addRoutes(this.$store.getters.addRouters) // 动态添加可访问路由表
      })
    } else if (this.$wsCache.get('menuList')) {
      this.$store.dispatch('GenerateRoutes').then(() => {
        let addRouters = this.$store.getters.addRouters
        this.$router.addRoutes(addRouters) // 动态添加可访问路由表
      })
    } else {
      this.getMenuList().then(() => {
        this.$store.dispatch('GenerateRoutes').then(() => {
          console.log(this.$store.getters.addRouters)
          this.$router.addRoutes(this.$store.getters.addRouters) // 动态添加可访问路由表
        })
      })
    }
  },
  methods: {
    async getMenuList() {
      // console.log(this.$store.getters.addRouters)
      this.$wsCache.set('menuList', list)
      // const res = await this.$api.common.getMenuList()
      // if(res) {
      //   this.$wsCache.set('menuList', res)
      // }
    }
  }
}
</script>
