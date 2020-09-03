# basic-bramework分支



## 干净的[vue-element-*admin*](https://github.com/PanJiaChen/vue-element-admin) 框架



一个可以直接使用的基于vue的后台管理项目，只保留了layout布局、登录两部分，其余全部移除。这样在做后台管理系统项目是就可以直接拿来使用了



## 使用介绍

### 登录

登录入口配置在vue.comfig配置，文件地址=》[src/page/login](https://github.com/lzq741167479/vue-client/tree/basic-framework/src/pages/login) 

在src/page/login/App.vue文件里的signIn方法决定登录效果。有两种方式：

- window.location.href是跳过后端认证的登录（已注释）。此时需要修改两个地方：
  - **修改src/page/main/permission.js第12行**，否则进入主页判断session没有userInfo数据就会跳转回登录页；
  - **修改src/page/main/App.vue第34行**，这样使用本地的模拟注册路由，否则进入主页只会有空白页面，啥也没有。***注意***：此时你新增一个页面后就要在src/page/main/routeList.js里注册下，否则目录不会显示
  - 如果你觉得每次都要新增注册路由很麻烦，可以**修改src/store/modules/permission.js第29和41行**，这样就不用注册，纯粹使用路由里的地址了
- publicKey()正常的登录，啥都不用做（默认流程），但是这样就需要后端接口的配合，不然登不进去。

## 结构目录

├─.editorconfig
├─.eslintignore
├─.eslintrc.js
├─.prettierrc
├─babel.config.js
├─package-lock.json
├─package.json
├─README.md
├─vue.config.js
├─src
|  ├─utils // 公共方法
|  |   ├─clipboard.js
|  |   ├─get-page-title.js
|  |   ├─index.js
|  |   └validate.js
|  ├─styles // 公共样式
|  |   ├─index.less
|  |   ├─sidebar.less // 侧边栏样式
|  |   ├─transition.less // 过度样式
|  |   └variables.less
|  ├─store
|  |   ├─getters.js
|  |   ├─index.js
|  |   ├─modules
|  |   |    ├─app.js
|  |   |    ├─dictData.js
|  |   |    ├─permission.js
|  |   |    ├─scanCache.js
|  |   |    └tagsView.js
|  ├─router // 路由
|  |   └index.js
|  ├─pages
|  |   ├─main // 主页
|  |   |  ├─App.vue
|  |   |  ├─main.js
|  |   |  ├─permission.js
|  |   |  ├─view
|  |   |  |  ├─test
|  |   |  |  |  └index.vue
|  |   |  |  ├─page
|  |   |  |  |  └index.vue
|  |   |  |  ├─home
|  |   |  |  |  └index.vue
|  |   |  |  ├─error-page
|  |   |  |  |     └404.vue
|  |   ├─login // 登录页
|  |   |   ├─App.vue
|  |   |   ├─main.js
|  |   |   └permission.js
|  ├─config // 页面配置项
|  |   └index.js
|  ├─components
|  |     ├─SvgIcon // svg图标组件（可删除）
|  |     |    └index.vue
|  |     ├─layout // 外层布局组件
|  |     |   ├─index.vue
|  |     |   ├─mixin
|  |     |   |   └ResizeHandler.js
|  |     |   ├─components
|  |     |   |     ├─AppMain.vue
|  |     |   |     ├─index.js
|  |     |   |     ├─Navbar.vue
|  |     |   |     ├─TagsView
|  |     |   |     |    ├─index.vue
|  |     |   |     |    └ScrollPane.vue
|  |     |   |     ├─Sidebar
|  |     |   |     |    ├─index.vue
|  |     |   |     |    ├─Item.vue
|  |     |   |     |    ├─Link.vue
|  |     |   |     |    ├─Logo.vue
|  |     |   |     |    └SidebarItem.vue
|  |     |   |     ├─Settings
|  |     |   |     |    └index.vue
|  |     ├─Hamburger 
|  |     |     └index.vue
|  |     ├─Breadcrumb
|  |     |     └index.vue
|  ├─cache 
|  |   └index.js
|  ├─assets // 项目图片
|  |   ├─img
|  |   ├─icons
|  |   |   ├─index.js
|  |   |   ├─svgo.yml
|  |   |   ├─svg
|  ├─api // api集
|  |  ├─axios.js
|  |  ├─index.js
|  |  ├─request.js
|  |  ├─modules
|  |  |    ├─commom.js
|  |  |    └login.js
├─public // 页面入口
|   ├─favicon.ico
|   └index.html