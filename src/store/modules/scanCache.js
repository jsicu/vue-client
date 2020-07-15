
const scanCache = {
  state: {
    imgCache: [] // 扫描缓存
  },
  mutations: {
    saveImgCache: (state, imgData) => {
      state.imgCache = imgData
    }
  },
  actions: {
  }
}

export default scanCache
