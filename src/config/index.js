/*
 * @Author: linzq
 * @Date: 2020-11-25 14:32:29
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-29 19:23:37
 * @Description: 配置
 */
/**
 * 全局配置
 */
export default {
  /**
   * 配置显示在浏览器标签的title
   */
  title: 'koa2服务前端项目',

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
   * 是否每次只显示一个并且是最新的message提示
   */
  one_message: true,

  /**
   * 导航栏是否只保持一个子菜单的展开
   */
  unique_opened: false,

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
   * 全局尺寸
   */
  size: 'small',

  /**
   * api请求基础路径
   */
  base_url: {
    dev: 'http://127.0.0.1:4000/', // 开发地址
    pro: 'http://139.9.51.227:4000/' // 生产地址
  }
}
