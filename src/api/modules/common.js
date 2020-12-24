import { get, post } from '../axios'

export default {
  // 路由获取
  getMenuList: function(params) {
    return get(params, '/commom/navigation')
  }
}