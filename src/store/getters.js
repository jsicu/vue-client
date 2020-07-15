const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routes: state => state.permission.routes,
  addRouters: state => state.permission.addRouters,
  imgCache: state => state.scanCache.imgCache,
  // '0001': state => state.dictData['0001'],
}
export default getters
