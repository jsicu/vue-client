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
  base_url: {
    dev: 'http://127.0.0.1:4000/' // 开发地址
  },
}
