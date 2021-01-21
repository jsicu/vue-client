/*
 * @Author: linzq
 * @Date: 2020-11-25 14:32:29
 * @LastEditors: linzq
 * @LastEditTime: 2021-01-21 14:10:47
 * @Description: 全局配置
 */

api = {
  dev: 'http://10.206.142.213:9527/', // 开发地址
  // dev: 'http://10.206.142.251:9527/', // 开发地址
  pro: '' //生产地址
}

module.exports = {
  /**
   * 配置显示在浏览器标签的title
   */
  title: 'vue-admin-element简洁版本',

  /**
   * 是否开启显示在浏览器标签的title,如果为false, 则只显示默认title
   */
  show_title: true,

  /**
   * @type {boolean} true | false
   * @description 在侧边栏显示logo
   */
  sidebarLogo: false,

  /**
   * @type {boolean} true | false
   * @description 标题栏是否固定
   */
  fixed_header: false,

  /**
   * 是否显示标签页
   */
  has_tags: true,

  /**
   * api请求基础路径
   */
  base_url: process.env.NODE_ENV === 'development' ? api.dev : api.pro
}
