/* 字典库 */

// import common from '@/api/modules/common'
// const dictData = {
//   state: {
//     '101':[], //主管部门
//     '102':[], //所在地
//     '103':[], //企业登记注册类型
//     '104':[], //币种
//     '105':[], //证书类型
//     '106':[], //资质状态
//     '107':[], //龙头企业类型
//     '108':[], //证书状态
//     '109':[], //资质专业
//     '110':[], //质序列
//     '111':[], //资质等级
//     '112':[], //资质之间关系
//     '113':[], //股东类型
//     '114':[], //资质检查通道类型
//     '115':[], //龙头企业资质对应资质专业信息
//     '116':[], //处罚类型
//     '117':[], //证书审批部门级别
//     '201':[], //证件类型
//     '202':[], //民族
//     '203':[], //最高学历
//     '204': [], //主要人员类型
//     '205': [], //证书专业
//     '206': [], //证书类型
//     '207': [], //证书类型及等级
//     '209': [], //人员职称专业与资质的关联关系
//     '210':[], //人员职称专业与相关专业的关联
//     '301':[], //立项级别
//     '302':[], //建设性质
//     '303':[], //工程用途
//     '304':[], //项目分类
//     '305':[], //施工承包方式/合同类别
//     '306':[], //施工组织方式
//     '307':[], //招标类型
//     '308':[], //招标方式
//     '309':[], //证件类型
//     '310':[], //注册类型及等级
//     '311':[], //承担角色
//     '312':[], //证件类型
//     '313':[], //结构体系
//     '314':[], //单体工程类别
//     '315':[], //结构质式
//     '316':[], //坑基支护方法
//     '317':[], //高边坡支护方法
//     '318':[], //基础建设等级
//     '319':[], //耐火等级
//     '320':[], //单位工程类型子类
//     '322':[], //申请理由
//     '323':[], //从事专业名称
//     '324':[], //企业承担角色
//     '326':[], //工程等级
//     '327':[], //职称等级
//     '329':[], //绿色建筑等级
//     '330':[], //工程投资性质
//     '331':[], //抗震设防烈度
//     'division': null // 项目所在地-全国
//   },
//   mutations: {
//     SET_DICTDATA(state, data) {
//       for (const key in data) {
//         state[key] = data[key]
//       }
//     },
//     SET_DICTDATANATION(state, data) {
//       state['division'] = data
//     }
//   },
//   actions: {
//     getDicData(context, dicCodes) {
//       const keys = Object.keys(context.state).join(',')
//       common.getDictsAll(keys).then((res) => {
//         const list = res.list || []
//         const obj = {}
//         list.forEach(item => {
//           obj[item.code] = []
//           obj[item.code] = item.list
//         })
//         context.commit('SET_DICTDATA', obj)
//       })
//     },
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
//   }
// }

// export default dictData
