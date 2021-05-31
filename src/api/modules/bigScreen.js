/**
 * @Author: linzq
 * @Date: 2021-04-14 22:19:19
 * @LastEditors: linzq
 * @LastEditTime: 2021-05-31 21:02:32
 * @Description:
 */
/*
 * @Author: linzq
 * @Date: 2021-03-01 20:20:01
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-25 23:00:12
 * @Description: 可视化bigScreen
 */

import { get, post } from '../axios'

export default {
  // 列表获取
  list: function(params) {
    return get(params, '/bigScreen/list')
  },
  // 新增景区
  newDest: function(params) {
    return post(params, '/bigScreen/dest')
  },
  // 列表获取
  allList: function(params) {
    return post(params, '/bigScreen/allList')
  },
  // 所有数据获取
  allData: function(params) {
    return post(params, '/bigScreen/allData')
  },
  // 等级情况 类型分布
  grade: function(params) {
    return post(params, '/bigScreen/gradeDistribution')
  },
  // 年趋势
  yearTrend: function(params) {
    return post(params, '/bigScreen/yearTrend')
  },
  // 前十
  topTen: function(params) {
    return post(params, '/bigScreen/topTen')
  },
  // 实时数据
  realData: function(params) {
    return post(params, '/bigScreen/realtimeData')
  },
  // 详情
  detail: function(params) {
    return post(params, '/bigScreen/detail')
  }
}
