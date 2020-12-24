import { asyncRoutes, constantRoutes } from '@/router'
import wsCache from '@/cache'
import path from 'path'

const permission = {
  state: {
    routes: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routes) => {
      const arr = generateRoutes(asyncRoutes)
        .filter(v => {
          // 比对后台返回的菜单数据
          if (v.children) {
            return v.children.filter(k => {
              if (k.children) {
                v.children = v.children.concat(k.children)
                delete k.children
              }
            })
          }
        })
        // ? 添加路由未匹配时的404重定向页面
        .concat([{ path: '*', redirect: '/404', hidden: true }])
      state.addRouters = arr // 比对后台返回的菜单数据
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        // const result = asyncRoutes // 使用本地静态路由
        // 比对后台返回的菜单数据
        const result = generateRoutes(asyncRoutes)
        commit('SET_ROUTERS', result)
        resolve()
      })
    },
    RenderNewMenu({ commit }) {
      return new Promise(resolve => {
        // const result = asyncRoutes // 使用本地静态路由
        // 比对后台返回的菜单数据
        const result = renderMenuRoute(asyncRoutes)
        commit('SET_ROUTERS', result)
        resolve()
      })
    }
  }
}

function renderMenuRoute(routes, basePath = '/') {
  const res = []
  for (const route of routes) {
    if (route.hidden) {
      continue
    }
    let onlyOneChild = null
    if (route.children && route.children.length === 1) {
      onlyOneChild = path.resolve(route.path, route.children[0].path)
    }
    let data = null
    for (const item of wsCache.get('newMenu')) {
      // if (path.resolve(basePath, onlyOneChild || route.path) === item.alias) {
      if (route.path === item.alias) {
        data = Object.assign({}, route)
        data.path = path.resolve(basePath, onlyOneChild || route.path)
        if (route.children) {
          data.children = []
        }
      }
    }
    if (route.children && data) {
      data.children = renderMenuRoute(route.children, data.path)
    }
    if (data) {
      res.push(data)
    }
  }
  return res
}

function generateRoutes(routes, basePath = '/') {
  const res = []
  // console.log(routes)
  for (const route of routes) {
    // skip some route
    if (route.hidden) {
      continue
    }

    let onlyOneChild = null

    if (route.children && route.children.length === 1) {
      onlyOneChild = path.resolve(route.path, route.children[0].path)
    }

    let data = null
    // 获取后台路由
    const list = (wsCache.get('menuList') && wsCache.get('menuList').list) || wsCache.get('newMenu')
    // console.log(list)
    for (const item of list) {
      if (route.path === item.alias) {
        data = Object.assign({}, route)
        data.path = path.resolve(basePath, onlyOneChild || route.path)
        if (data.meta) {
          data.meta.title = item.name
        }
        if (route.children) {
          data.children = []
        }
      }
    }
    // console.log(data)
    // recursive child routes
    if (route.children && data) {
      data.children = generateRoutes(route.children, data.path)
    }
    if (data) {
      res.push(data)
    }
  }
  return res
}

export default permission
