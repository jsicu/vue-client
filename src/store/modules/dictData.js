/*
 * @Author: linzq
 * @Date: 2021-01-30 16:22:26
 * @LastEditors: linzq
 * @LastEditTime: 2021-03-29 19:25:04
 * @Description:
 */
/* 字典库 */

import common from '@/api/modules/common'
const dictData = {
  state: {
    '1': [], //主管部门
    division: null // 项目所在地-全国
  },
  mutations: {
    SET_DICTDATA(state, data) {
      for (const key in data) {
        console.log(data[key])
        state[key] = data[key]
      }
    }
    //     SET_DICTDATANATION(state, data) {
    //       state['division'] = data
    //     }
  },
  actions: {
    getDicData(context, dicCodes) {
      common.getAll().then(res => {
        context.commit('SET_DICTDATA', res)
      })
    }
    //     getPersonDicData(context, dicCodes) {
    //       const keys = Object.keys(context.state).join(',')
    //       common.getPersonnelDictsAll(keys).then((res) => {
    //         const obj = {}
    //         res.forEach(item => {
    //           obj[item.code] = []
    //           obj[item.code] = item.list
    //         })
    //         context.commit('SET_DICTDATA', obj)
    //       })
    //     },
    //     getProjectDictsAll(context, dicCodes) {
    //       const keys = Object.keys(context.state).join(',')
    //       common.getProjectDictsAll(keys).then((res) => {
    //         const obj = {}
    //         res.forEach(item => {
    //           obj[item.code] = []
    //           obj[item.code] = item.list
    //         })
    //         context.commit('SET_DICTDATA', obj)
    //       })
    //     },
    //     getNationTree(context, dicCodes) {
    //       common.getNationTree().then((res) => {
    //         context.commit('SET_DICTDATANATION', res.list)
    //       })
    //     }
  }
}

export default dictData
