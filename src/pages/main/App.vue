<!--
 * @Author: linzq
 * @Date: 2020-11-25 14:32:29
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-31 20:57:20
 * @Description: 
-->
<template>
  <div id="app">
    <!-- 这是登录成功页 -->
    <router-view />
  </div>
</template>

<script>
import list from './routerList'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  mounted() {
    window.addEventListener('beforeunload', e => this.logout())
  },
  created() {
    this.getDicData()

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
  beforeDestroy() {
    alert('111')
  },
  methods: {
    ...mapActions({
      getDicData: 'getDicData'
    }),
    async getMenuList() {
      // this.$wsCache.set('menuList', list) // 本地静态路由
      const res = await this.$api.common.getMenuList()
      if (res) {
        this.$wsCache.set('menuList', res)
      }
    },
    async logout() {
      await this.$api.login.logout()
    }
  }
}
</script>
