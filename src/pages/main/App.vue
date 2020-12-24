<template>
  <div id="app">
    <!-- 登录成功页 -->
    <router-view />
  </div>
</template>

<script>
import list from './routerList'

export default {
  name: 'App',
  created() {
    // ? newMenu更新路由的时候使用（比如角色更换），这个案例里还未用到
    // ? menuList正常的路由，首次登陆时
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
          this.$router.addRoutes(this.$store.getters.addRouters) // 动态添加可访问路由表
        })
      })
    }
  },
  methods: {
    async getMenuList() {
      // this.$wsCache.set('menuList', list.list) // 本地静态路由
      const res = await this.$api.common.getMenuList()
      if (res) {
        this.$wsCache.set('menuList', res)
      }
    }
  }
}
</script>
